package com.onefi.XOneFiApp.service.wifi;

import com.onefi.XOneFiApp.udp.ConnectionHelper;

public  interface AsyncResultListener {
   void onSuccess(ConnectionHelper.ConnectionResult o);

   void onFailed(ConnectionHelper.ConnectionResult e);
}