package com.onefi.XOneFiApp;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;

import android.net.wifi.WifiConfiguration;
import android.net.wifi.WifiManager;
import android.net.NetworkSpecifier;
import android.net.ConnectivityManager;
import android.net.wifi.WifiNetworkSpecifier;
import android.net.NetworkRequest;
import android.net.NetworkCapabilities;
import android.net.wifi.WifiNetworkSuggestion;
import android.net.wifi.hotspot2.PasspointConfiguration;

import android.content.Context;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;

public class WifiModule extends ReactContextBaseJavaModule {

    private WifiManager wifiManager;
    //private ConnectivityManager mConnectivityManager;
    WifiModule(ReactApplicationContext context) {
        super(context);
        wifiManager = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
        //mConnectivityManager = (ConnectivityManager) context.getApplicationContext().getSystemService(Context.CONNECTIVITY_SERVICE);
    }

    @NonNull
    @Override
    public String getName() {
        return "WifiModule";
    }

    @ReactMethod
    public void logEvent(Callback callback){
        Log.d("WifiModule", "Logged from WifiModule");
        callback.invoke("Data returned from Native Module");
    }

    /**
     * Connect to the specified wifi network.
     *
     * @param networkSSID     - The wifi network SSID
     * @param networkPassword - the wifi password
     */
    @ReactMethod
    private void connectToWifi(final String networkSSID, final String networkPassword) {
        if (!wifiManager.isWifiEnabled()) {
            wifiManager.setWifiEnabled(true);
        }

        WifiConfiguration conf = new WifiConfiguration();
        conf.SSID = String.format("\"%s\"", networkSSID);
        conf.preSharedKey = String.format("\"%s\"", networkPassword);

        int netId = wifiManager.addNetwork(conf);
        wifiManager.disconnect();
        wifiManager.enableNetwork(netId, true);
        wifiManager.reconnect();
    }

    private ConnectivityManager.NetworkCallback mNetworkCallback = new ConnectivityManager.NetworkCallback();

    @ReactMethod
    public void connectToWifi2(final String ssid, final String password) {
        /*NetworkSpecifier networkSpecifier  = new WifiNetworkSpecifier.Builder()
                .setSsid(ssid)
                .setWpa2Passphrase(password)
                .setIsHiddenSsid(true) //specify if the network does not broadcast itself and OS must perform a forced scan in order to connect
                .build();*/

        /*NetworkRequest networkRequest  = new NetworkRequest.Builder()
                .addTransportType(NetworkCapabilities.TRANSPORT_WIFI)
                .setNetworkSpecifier(networkSpecifier)
                .build();
        mConnectivityManager.requestNetwork(networkRequest, mNetworkCallback);*/

        Log.d("WifiModule", "ssid : " + ssid);
        Log.d("WifiModule", "password : " + password);

        final WifiNetworkSuggestion networkSuggestion  = new WifiNetworkSuggestion.Builder()
                .setSsid(ssid)
                .setWpa2Passphrase(password)
                .setIsAppInteractionRequired(true)
                .build();

        final PasspointConfiguration passpointConfig = new PasspointConfiguration();
        // configure passpointConfig to include a valid Passpoint configuration

        /*final List<WifiNetworkSuggestion> suggestionsList =
                new ArrayList<WifiNetworkSuggestion>{{
                    add(networkSuggestion);
        }};*/
        //suggestionsList.add(networkSuggestion);
        List<WifiNetworkSuggestion> suggestionsList =
                new ArrayList<WifiNetworkSuggestion>();
        suggestionsList.add(networkSuggestion);

        final int status = wifiManager.addNetworkSuggestions(suggestionsList);
        Log.d("WifiModule", "status from wifiManager.addNetworkSuggestion : " + status);
        if (status != WifiManager.STATUS_NETWORK_SUGGESTIONS_SUCCESS) {
        // do error handling here…
            Log.d("WifiModule", "status != WifiManager.STATUS_NETWORK_SUGGESTIONS_SUCCESS");
        }

        // Optional (Wait for post connection broadcast to one of your suggestions)
        final IntentFilter intentFilter =
                new IntentFilter(WifiManager.ACTION_WIFI_NETWORK_SUGGESTION_POST_CONNECTION);

        final BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                if (!intent.getAction().equals(
                        WifiManager.ACTION_WIFI_NETWORK_SUGGESTION_POST_CONNECTION)) {
                    return;
                }
                Log.d("WifiModule", "connectByWifiNetworkSuggestion: onReceive: ");
                // do post connect processing here...
            }
        };
        ReactApplicationContext context = getReactApplicationContext();
        context.registerReceiver(broadcastReceiver, intentFilter);
    }
}