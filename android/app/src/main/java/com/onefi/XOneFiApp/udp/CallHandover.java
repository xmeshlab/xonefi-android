package com.onefi.XOneFiApp.udp;

import com.onefi.XOneFiApp.entities.CallHandOverMessage;
import com.onefi.XOneFiApp.entities.CallHandOverSendCommand;
import com.onefi.XOneFiApp.entities.Message;
import com.onefi.XOneFiApp.service.wifi.ClientWorker;
import com.onefi.XOneFiApp.utils.JsonUtil;
import com.onefi.XOneFiApp.utils.SignUtil;

import org.web3j.crypto.Credentials;
import org.web3j.crypto.Sign;

import java.util.UUID;

public class CallHandover {
    public static void callHandover(String ip, int port, String prk, String session, Message sackok, ClientWorker.Callback responseListener) {
        Credentials credentials = Credentials.create(prk);
        String pubaddress = credentials.getAddress();
        CallHandOverMessage message = new CallHandOverMessage();
        CallHandOverSendCommand command = new CallHandOverSendCommand();
        command.setOp("HANDOVER");
        command.setFrom(pubaddress);
        command.setUuid(UUID.randomUUID().toString());
        command.setTimeStamp(System.currentTimeMillis() / 1000);
        command.setSession(session);
        command.setRe("");
        command.setArguments(sackok);
        message.setCommand(command);
        Sign.SignatureData signatureData = Sign.signMessage(
                JsonUtil.toJson(command).getBytes(),
                credentials.getEcKeyPair(),
                false
        );
        String vrs = SignUtil.getSignature(signatureData);
        command.setSignature(vrs);
        AsyncUdp asyncUdp = new AsyncUdp();
        asyncUdp.send(ip, String.valueOf(port), JsonUtil.toJson(message),responseListener);
    }



}
