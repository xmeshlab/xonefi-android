package com.onefi.XOneFiApp.udp;

import android.util.Log;

import com.onefi.XOneFiApp.entities.ClientSession;
import com.onefi.XOneFiApp.entities.Command;
import com.onefi.XOneFiApp.entities.CommandArgs;
import com.onefi.XOneFiApp.entities.Message;
import com.onefi.XOneFiApp.entities.OneFiConfig;
import com.onefi.XOneFiApp.api.ClientSessionApi;
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
import java.lang.reflect.InvocationTargetException;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class SACK {
    private static final String OP = "SACK";
    public static final String SACK_OK = "SACK-OK";
    private static final String UUID_V4 = "uuid";
    private static final String TIMESTAMP = "current_timestamp";


    public static class AnswerSACKArguments implements CommandArgs {
        private String answer;

        public String getAnswer() {
            return answer;
        }
    }

    public static class ArgumentSACK implements CommandArgs {

        public String client;
        public long amount;
        public long timestamp;
        public String proof;
    }

    public static void sendNextSACK(OneFiConfig config, String userPassword, String privateKey, ClientSessionApi clientSessionApi, ClientWorker.Callback callback) {
        ClientSession clientSession = config.getClientSession();
        long currentSackAmount = (long) (clientSession.getSackNumber() * (clientSession.getSackNumber() + 1) * Math.pow(10, 12));

        clientSession.setStatus(ClientSession.ClientSessionStatus.ACTIVE.getValue());
        clientSession.setExpirationTimestamp(clientSession.getPafrenTimestamp());
        clientSession.setSackNumber(clientSession.getSackNumber() + 1);
        long currentTimeStamp = TimeUtil.getCurrentTimeStamp();
        clientSession.setLastSackTimestamp(currentTimeStamp);

        try {
            clientSessionApi.setClientSession(clientSession);
            EncodeData sackData = new EncodeData();
            sackData.setClient(config.getAccount().getAddress());
            sackData.setHotspot(clientSession.getProviderAddress());
            sackData.setCurrentAmount(currentSackAmount);
            sackData.setPrk(privateKey);
            callSACK(
                    clientSession.getIp(),
                    clientSession.getPort(),
                    privateKey,
                    clientSession.getSessionId(),
                    "",
                    currentSackAmount,
                    currentTimeStamp,
                    encodeSACK(sackData),
                    r -> {
                        Log.d("sendSACK", "completed");
                        callback.callback(r);
                    }
            );
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
    }

    private static class SACKArgs implements CommandArgs {
        private ArgumentSACK sack;
    }

    public static void callSACK(
            String ip,
            int port,
            String privateKey,
            String sessionId,
            String re,
            long currentSackAmount,
            long currentTimeStamp,
            String proof,
            ClientWorker.Callback callback) {
        Credentials credentials = Credentials.create(privateKey);
        String pubaddress = credentials.getAddress();
        ArgumentSACK argumentSACK = new ArgumentSACK();
        argumentSACK.client = pubaddress;
        argumentSACK.amount = currentSackAmount;
        argumentSACK.timestamp = currentTimeStamp;
        argumentSACK.proof = proof;
        Command.Builder<ArgumentSACK> cmdBuilder = new Command.Builder<>();
        SACKArgs sackArgs = new SACKArgs();
        sackArgs.sack = argumentSACK;
        Command command = cmdBuilder
                .op(OP)
                .from(pubaddress)
                .uuid(UUID.randomUUID().toString())
                .timestamp(currentTimeStamp)
                .session(sessionId)
                .re("")
                .arguments(sackArgs).build();

        Message<ArgumentSACK> message = new Message();
        message.setCommand(command);
//        Sign.SignatureData signatureData = Sign.signMessage(JsonUtil.toJson(message.getCommand()).getBytes(), credentials.getEcKeyPair());
//        String signature = SignUtil.getSignature(signatureData);
        String signature = SignUtil.signMessage(JsonUtil.toJson(message.getCommand()), privateKey);
        AsyncUdp asyncUdp = new AsyncUdp();
        message.setSignature(signature);
        asyncUdp.send(ip, String.valueOf(port), JsonUtil
                .toJson(message), callback);
    }



    public static String encodeSACK(EncodeData sackData) {
        String client = sackData.getClient();
        String hotspot = sackData.getHotspot();
        long amount = sackData.getCurrentAmount();
        long timestamp = sackData.getCurrentTimeStamp();
        String prk = sackData.getPrk();
        byte[] messageToSign =
                Arrays.concatenate(
                        "S".getBytes(),
                        Arrays.concatenate(
                                Numeric.hexStringToByteArray(client),
                                Numeric.hexStringToByteArray(hotspot),
                                Numeric.hexStringToByteArray(Numeric.toHexStringNoPrefixZeroPadded(BigInteger.valueOf(amount), 64)),
                                Numeric.hexStringToByteArray(Numeric.toHexStringNoPrefixZeroPadded(BigInteger.valueOf(timestamp), 8))
                        )
                );

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
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
        Log.d("sack hash is ",  hashedPrefixedMessage.toString());
        Sign.SignatureData signedMessage = Sign.signMessage(
                hashedPrefixedMessage, credentials.getEcKeyPair(), false);

//        Sign.SignatureData signedMessage = Sign.signPrefixedMessage(
//                hashedPrefixedMessage, credentials.getEcKeyPair());
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
