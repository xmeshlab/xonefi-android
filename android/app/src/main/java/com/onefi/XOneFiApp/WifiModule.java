package com.onefi.XOneFiApp;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class WifiModule extends ReactContextBaseJavaModule {
    WifiModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "WifiModule";
    }

    @ReactMethod
    public void logEvent(){
        Log.d("WifiModule", "Logged from WifiModule");
    }
}