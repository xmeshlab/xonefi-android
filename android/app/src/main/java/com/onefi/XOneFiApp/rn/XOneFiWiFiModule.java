package com.onefi.XOneFiApp.rn;

import android.content.Context;
import android.content.Intent;
import android.net.wifi.WifiConfiguration;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Build;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.onefi.XOneFiApp.entities.OneFiConfig;
import com.onefi.XOneFiApp.service.wifi.AsyncResultListener;
import com.onefi.XOneFiApp.service.wifi.WifiService;
import com.onefi.XOneFiApp.storage.OneFiStorage;
import com.onefi.XOneFiApp.udp.ConnectionHelper;
import com.onefi.XOneFiApp.utils.Crypto;
import com.onefi.XOneFiApp.utils.SSIDUtil;
import com.thanosfisherman.wifiutils.WifiUtils;
import com.thanosfisherman.wifiutils.wifiConnect.ConnectionErrorCode;
import com.thanosfisherman.wifiutils.wifiConnect.ConnectionSuccessListener;

import java.util.List;

public class XOneFiWiFiModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext context;
    public XOneFiWiFiModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }
    @NonNull
    @Override
    public String getName() {
        return "XOneFiWiFiModule";
    }

    @ReactMethod
    public void startScan () {
        Intent startIntent = new Intent(this.context, WifiService.class);
        this.context.startService(startIntent);
    }

    @ReactMethod
    public void stopScan () {
        Intent startIntent = new Intent(this.context, WifiService.class);
        this.context.stopService(startIntent);
    }
    @ReactMethod
    public void initialConnect(@NonNull final String SSID, @NonNull final String password, final Promise promise) {
        ReactApplicationContext reactApplicationContext = getReactApplicationContext();

        SSIDUtil.DeserializeSSIDResult deserializeSSIDResult = SSIDUtil.deserializeSSID(SSID);
        OneFiStorage oneFiStorage = OneFiStorage.getInstance(reactApplicationContext);
        OneFiConfig config = oneFiStorage.getConfig();
        try {
            String decryptPrivateKey = Crypto.decrypt(config.getAccount().getEncryptedPrk(), password);
            ConnectionHelper.initialConnection(
                    reactApplicationContext,
                    deserializeSSIDResult,
                    password,
                    decryptPrivateKey,
                    config,
                    new AsyncResultListener() {
                        @Override
                        public void onSuccess(ConnectionHelper.ConnectionResult o) {
                            promise.resolve(null);
                        }

                        @Override
                        public void onFailed(ConnectionHelper.ConnectionResult e) {
                            WritableNativeMap writableNativeMap = new WritableNativeMap();
                            writableNativeMap.putString("error", e.getError());
                            writableNativeMap.putBoolean("hasError", e.isHasError());
                            promise.resolve(writableNativeMap);
                        }
                    }
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void connectWifi (@NonNull final String SSID, @NonNull final String password, final Promise promise) {
        WifiUtils.withContext(context)
                .connectWith(SSID, password)
                .setTimeout(1000L * 50)
                .onConnectionResult(new ConnectionSuccessListener() {
                    @Override
                    public void success() {
                        promise.resolve(null);
                    }

                    @Override
                    public void failed(@NonNull ConnectionErrorCode errorCode) {
                        final WritableMap error = new WritableNativeMap();

                        promise.reject("connect error",String.valueOf(errorCode));
                    }
                }).start();

    }

    @ReactMethod
    public void getConnectionInfo (final Promise promise) {
        WifiManager wifiManager = (WifiManager) context.getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        WifiInfo connectionInfo = wifiManager.getConnectionInfo();
        final WritableMap connectInfoObj = new WritableNativeMap();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            connectInfoObj.putString("passpointProviderFriendlyName", connectionInfo.getPasspointProviderFriendlyName());
            connectInfoObj.putString("passpointFqdn", connectionInfo.getPasspointFqdn());

            connectInfoObj.putInt("rxLinkSpeedMbps", connectionInfo.getRxLinkSpeedMbps());
            connectInfoObj.putInt("txLinkSpeedMbps", connectionInfo.getTxLinkSpeedMbps());
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            connectInfoObj.putInt("wifiStandard", connectionInfo.getWifiStandard());
            connectInfoObj.putInt("maxSupportedRxLinkSpeedMbps", connectionInfo.getMaxSupportedRxLinkSpeedMbps());
            connectInfoObj.putInt("maxSupportedTxLinkSpeedMbps", connectionInfo.getMaxSupportedTxLinkSpeedMbps());
        }

        connectInfoObj.putInt("networkId", connectionInfo.getNetworkId());
        connectInfoObj.putInt("linkSpeed", connectionInfo.getLinkSpeed());
        connectInfoObj.putInt("rssi", connectionInfo.getRssi());
        connectInfoObj.putString("macAddress", connectionInfo.getMacAddress());
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            connectInfoObj.putInt("currentSecurityType", connectionInfo.getCurrentSecurityType());
        }
        promise.resolve(connectInfoObj);
    }

//    @ReactMethod


    @ReactMethod
    public void getWiFiConfiguration(final Promise promise) {
        WifiManager wifiManager = (WifiManager) context.getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        List<WifiConfiguration> configuredNetworks = wifiManager.getConfiguredNetworks();
//        configuredNetworks.get()
        promise.resolve(mapWifiConfiguation(configuredNetworks));
    }

    public static WritableArray mapWifiConfiguation(final List<WifiConfiguration> configuredNetworks) {
        final WritableArray wifiArray = new WritableNativeArray();

        for (WifiConfiguration result : configuredNetworks) {
            final WritableMap wifiObject = new WritableNativeMap();
            if (result.SSID.equals("")) {
                result.SSID = "(hidden SSID)";
            }
            wifiObject.putString("SSID", result.SSID);
            wifiObject.putString("BSSID", result.BSSID);
            wifiObject.putString("allowedAuthAlgorithms", String.valueOf(result.allowedAuthAlgorithms));
            wifiObject.putString("allowedGroupCiphers", String.valueOf(result.allowedGroupCiphers));
            wifiObject.putString("preSharedKey", result.preSharedKey);
            wifiArray.pushMap(wifiObject);
        }

        return wifiArray;
    }
}
