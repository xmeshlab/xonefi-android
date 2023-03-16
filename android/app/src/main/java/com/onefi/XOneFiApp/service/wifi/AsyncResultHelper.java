package com.onefi.XOneFiApp.service.wifi;

import com.onefi.XOneFiApp.udp.ConnectionHelper;

public class AsyncResultHelper {
   public static void success(String msg, AsyncResultListener callback) {
      ConnectionHelper.ConnectionResult connectionResult = new ConnectionHelper.ConnectionResult();
      connectionResult.setMessage(msg);
      callback.onSuccess(connectionResult);
   }

   public static void failed(String msg, AsyncResultListener callback) {
      ConnectionHelper.ConnectionResult connectionResult = new ConnectionHelper.ConnectionResult();
      connectionResult.setError(msg);
      callback.onFailed(connectionResult);
   }
}
