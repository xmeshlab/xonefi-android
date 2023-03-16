package com.onefi.XOneFiApp.api;

import android.content.Context;

import com.onefi.XOneFiApp.storage.OneFiStorage;

public class Api {
    final Context context;
    final OneFiStorage storage;
   public Api(Context ctx) {
      context = ctx;
      storage =  OneFiStorage.getInstance(ctx);
   }
}
