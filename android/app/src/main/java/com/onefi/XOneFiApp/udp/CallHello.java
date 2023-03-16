package com.onefi.XOneFiApp.udp;

import com.onefi.XOneFiApp.entities.Command;
import com.onefi.XOneFiApp.entities.CommandArgs;
import com.onefi.XOneFiApp.entities.Message;
import com.onefi.XOneFiApp.service.wifi.ClientWorker;
import com.onefi.XOneFiApp.utils.JsonUtil;
import com.onefi.XOneFiApp.utils.SignUtil;
import com.onefi.XOneFiApp.utils.TimeUtil;

import org.web3j.crypto.Credentials;
import org.web3j.crypto.ECKeyPair;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;

import java.util.UUID;

import static com.onefi.XOneFiApp.utils.SignUtil.concatenateSignature;

public class CallHello {
   static class Args implements CommandArgs {
      Args () {}
   }
   public static String OP = "HELLO";
   public static String OK = "HELLO-OK";
   public static String UNLIMITED = "PAFREN-UNLIMITED";
   public static void callHello(String ip, String port, String prk, String session, ClientWorker.Callback callback) {
      Message<Args> message = new Message<>();
      Command.Builder<Args> commandBuilder = new Command.Builder<>();
//      ECKeyPair ecKeyPair = ECKeyPair.create(Numeric.toBigInt(prk));
      Credentials credentials = Credentials.create(prk);
      String pubaddress = credentials.getAddress();
      Command<Args> command = commandBuilder.op(OP)
              .uuid(UUID.randomUUID().toString())
              .from(pubaddress)
              .timestamp(TimeUtil.getCurrentTimeStamp())
              .session(session)
              .re("")
              .arguments(new Args()).build();
      message.setCommand(command);
      String signature = SignUtil.signMessage(JsonUtil.toJson(command), prk);

      AsyncUdp asyncUdp = new AsyncUdp();
      message.setSignature(signature);
      asyncUdp.send(ip, port, JsonUtil.toJson(message), callback);
   }
}
