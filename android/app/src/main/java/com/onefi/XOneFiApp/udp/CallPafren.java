package com.onefi.XOneFiApp.udp;

import com.onefi.XOneFiApp.entities.Command;
import com.onefi.XOneFiApp.entities.CommandArgs;
import com.onefi.XOneFiApp.entities.Message;
import com.onefi.XOneFiApp.entities.EncodeData;
import com.onefi.XOneFiApp.service.wifi.ClientWorker;
import com.onefi.XOneFiApp.utils.JsonUtil;
import com.onefi.XOneFiApp.utils.SignUtil;
import com.onefi.XOneFiApp.utils.TimeUtil;

import org.bouncycastle.util.Arrays;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.ECKeyPair;
import org.web3j.crypto.Hash;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.UUID;

public class CallPafren {
    static class CallPafrenArgs implements CommandArgs {

        public Pafren getPafren() {
            return pafren;
        }

        public void setPafren(Pafren pafren) {
            this.pafren = pafren;
        }

        private Pafren pafren;
        CallPafrenArgs() {
        }
    }
    static class Pafren {

        private String client;
        private long amount;
        private long timestamp;
        private String proof;

        private Pafren(Builder builder) {
            client = builder.client;
            amount = builder.amount;
            timestamp = builder.timestamp;
            proof = builder.proof;
        }

        public static final class Builder {
            private String client;
            private long amount;
            private long timestamp;
            private String proof;

            public Builder() {
            }

            public Builder client(String val) {
                client = val;
                return this;
            }

            public Builder amount(long val) {
                amount = val;
                return this;
            }

            public Builder timestamp(long val) {
                timestamp = val;
                return this;
            }

            public Builder proof(String val) {
                proof = val;
                return this;
            }

            public Pafren build() {
                return new Pafren(this);
            }
        }
    }

    public static String OP = "PAFREN";
    public static String OK = "PAFREN-OK";

    public static void callPafren(String ip, String port, String prk, String session, long amount, String re, long expTimestamp, String proof,
                                  ClientWorker.Callback callback,
                                  ClientWorker.Callback errorCallback
    ) {
        Message<CallPafrenArgs> message = new Message<>();
        Command.Builder<CallPafrenArgs> commandBuilder = new Command.Builder<>();
        Credentials credentials = Credentials.create(prk);
        String pubaddress = credentials.getAddress();
        CallPafrenArgs args = new CallPafrenArgs();
        Pafren.Builder pafrenBulder = new Pafren.Builder();
        Pafren pafrenObj = pafrenBulder
                .client(pubaddress)
                .amount(amount)
                .timestamp(expTimestamp)
                .proof(proof).build();
        args.setPafren(pafrenObj);
        Command<CallPafrenArgs> command = commandBuilder.op(OP)
                .uuid(UUID.randomUUID().toString())
                .from(pubaddress)
                .timestamp(TimeUtil.getCurrentTimeStamp())
                .session(session)
                .re(re)
                .arguments(args).build();
        message.setCommand(command);
//        Sign.SignatureData signatureData = SignUtil.signatureData(command, credentials);
        String signatureData = SignUtil.signMessage(JsonUtil.toJson(command), prk);
//        String signature = SignUtil.getSignature(signatureData);
        message.setSignature(signatureData);
        AsyncUdp asyncUdp = new AsyncUdp();
        asyncUdp
                .setTimeout(60 * 1000 * 2)
                .send(ip, port, JsonUtil.toJson(message), callback, errorCallback);
    }


    public static String encodePafren(EncodeData data, String prk) {
        String client = data.getClient();
        String hotspot = data.getHotspot();
        long amount = data.getCurrentAmount();
        long timestamp = data.getCurrentTimeStamp();
        byte[] messageToSign =
                Arrays.concatenate(
                        "P".getBytes(),
                        Arrays.concatenate(
                                Numeric.hexStringToByteArray(client),
                                Numeric.hexStringToByteArray(hotspot),
                                Numeric.hexStringToByteArray(Numeric.toHexStringNoPrefixZeroPadded(BigInteger.valueOf(amount ),64)),
                                Numeric.hexStringToByteArray(Numeric.toHexStringNoPrefixZeroPadded(BigInteger.valueOf(timestamp), 8))
                        )
                );

        //String prefix = "\u0019Ethereum Signed Message:\n" + messageToSign.length;
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream( );
        byte[] hashedUnprefixedMessage = Hash.sha3(messageToSign);
        String prefix = "\u0019Ethereum Signed Message:\n" + hashedUnprefixedMessage.length;

        try {
            outputStream.write(prefix.getBytes());
            outputStream.write(hashedUnprefixedMessage);
        } catch (IOException e) {
            throw new RuntimeException("Error when generating signature", e);
        }

        byte[] hashedPrefixedMessage = Hash.sha3(outputStream.toByteArray());

//        Credentials credentials = getSavedCredentials(context);

        Credentials credentials = Credentials.create(prk);
        Sign.SignatureData signedMessage = Sign.signMessage(
                hashedPrefixedMessage, credentials.getEcKeyPair(), false);

//        ECDSASignature sig =
//                new ECDSASignature(
//                        new BigInteger(1, signedMessage.getR()),
//                        new BigInteger(1, signedMessage.getS()));
//
//        int sigV = new BigInteger(signedMessage.getV()).intValue();
        String hexSigR = Numeric.toHexString(signedMessage.getR());
        String hexSigS = Numeric.toHexString(signedMessage.getS());

        String v = Numeric.toHexString(new BigInteger(signedMessage.getV()).toByteArray());
        String vrs = hexSigR + hexSigS.substring(2) + v.substring(2);
        return vrs;
    }
}
