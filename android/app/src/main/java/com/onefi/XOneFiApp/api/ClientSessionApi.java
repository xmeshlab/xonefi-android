package com.onefi.XOneFiApp.api;

import android.content.Context;

import com.onefi.XOneFiApp.entities.ClientSession;
import com.onefi.XOneFiApp.utils.JsonUtil;

import java.lang.reflect.InvocationTargetException;

public class ClientSessionApi  extends Api {


   public ClientSessionApi(Context ctx) {
      super(ctx);
   }

   public void setScanCounter (int counter) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
      ClientSession clientSession = getData();
      clientSession.setScanCounter(counter);
      storage.setItem("client_session", JsonUtil.toJson(clientSession));
   }

   public void setSackNumber (int counter) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
      ClientSession clientSession = getData();
      clientSession.setSackNumber(counter);
      storage.setItem("client_session", JsonUtil.toJson(clientSession));
   }
   public void setInitialedSackNumber (int counter) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
      ClientSession clientSession = getData();
      clientSession.setInitiatedSackNumber(counter);
      storage.setItem("client_session", JsonUtil.toJson(clientSession));
   }

   public ClientSession getData () {
      String clientSessionJsonStr = storage.getItem("client_session");
      ClientSession clientSession = JsonUtil.fromJson(clientSessionJsonStr, ClientSession.class);
      return clientSession;
   }

   public void setClientSession (ClientSession clientSession) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
      String clientSessionJsonStr = JsonUtil.toJson(clientSession);
      storage.setItem("client_session", clientSessionJsonStr);
   }

}
