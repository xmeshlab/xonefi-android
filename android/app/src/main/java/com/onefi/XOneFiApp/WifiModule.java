package com.onefi.XOneFiApp;
import android.app.NotificationManager;
import android.net.Network;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.coordinatorlayout.widget.CoordinatorLayout;

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
import android.provider.Settings;

import android.content.Context;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;
import android.view.View;
import android.widget.Toast;

import androidx.core.app.NotificationCompat;
import android.os.Build;
import android.app.NotificationChannel;
import androidx.core.app.NotificationManagerCompat;
import android.app.Notification;
import android.app.PendingIntent;

import android.app.Activity;

public class WifiModule extends ReactContextBaseJavaModule {

    private WifiManager wifiManager;
    //private ConnectivityManager mConnectivityManager;
    WifiModule(ReactApplicationContext context) {
        super(context);
        wifiManager = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
        //mConnectivityManager = (ConnectivityManager) context.getApplicationContext().getSystemService(Context.CONNECTIVITY_SERVICE);

        //create channel for notification
        createNotificationChannel(context);
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

    private void createNotificationChannel(Context context){
        String CHANNEL_ID = "some_channel_id";
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            //CharSequence name = context.getString(R.string.channel_name);
            CharSequence name = "Test Channel";
            //String description = context.getString(R.string.channel_description);
            String description = "Test Notification";
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            channel.setDescription(description);
            channel.setShowBadge(true);
            channel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
            channel.enableVibration(true);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            NotificationManager notificationManager = context.getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    @ReactMethod
    public void ShowNotification(final String ssid) {
            ReactApplicationContext context = getReactApplicationContext();

            CharSequence text = "Click and Connect To :  " + ssid;
            Intent intent = new Intent(context, MainActivity.class);

            PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent,
                    PendingIntent.FLAG_IMMUTABLE);

            NotificationCompat.Builder builder = new NotificationCompat.Builder(context, "some_channel_id")
                    .setSmallIcon(R.mipmap.ic_launcher_round)
                    .setContentText(text)
                    .setPriority(NotificationCompat.PRIORITY_HIGH)
                    .setDefaults(Notification.DEFAULT_SOUND | Notification.DEFAULT_VIBRATE)
                    .setContentIntent(pendingIntent)
                    .setChannelId("some_channel_id");
            //.setContentIntent(pendingIntent);

            /*//show notification
            NotificationManagerCompat notificationManager = NotificationManagerCompat.from(context);
            // notificationId is a unique int for each notification that you must define
            int notificationId = 1;
            notificationManager.notify(notificationId, builder.build());*/

            Notification buildNotification = builder.build();
            NotificationManager mNotifyMgr = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
            mNotifyMgr.notify(001, buildNotification);

    }

    @ReactMethod
    public void connectToWifi2(final String ssid, final String password) {

        Log.d("WifiModule", "ssid : " + ssid);
        Log.d("WifiModule", "password : " + password);

        ReactApplicationContext context = getReactApplicationContext();

        //Logs to figure out what is causing the delay
        Long tsLong = System.currentTimeMillis();
        String ts = tsLong.toString();
        Log.d("WifiModule", "Timestamp before creating new WifiNetworkSuggestion : " + ts);

        final WifiNetworkSuggestion networkSuggestion  = new WifiNetworkSuggestion.Builder()
                .setSsid(ssid)
                .setWpa2Passphrase(password)
                .build();
        //.setIsAppInteractionRequired(true)

        tsLong = System.currentTimeMillis();
        ts = tsLong.toString();
        Log.d("WifiModule", "Timestamp After creating new WifiNetworkSuggestion : " + ts);

        //final PasspointConfiguration passpointConfig = new PasspointConfiguration();

        List<WifiNetworkSuggestion> suggestionsList =
                new ArrayList<WifiNetworkSuggestion>();
        suggestionsList.add(networkSuggestion);

        tsLong = System.currentTimeMillis();
        ts = tsLong.toString();
        Log.d("WifiModule", "Timestamp before addNetworkSuggestions : " + ts);
        final int status = wifiManager.addNetworkSuggestions(suggestionsList);

        tsLong = System.currentTimeMillis();
        ts = tsLong.toString();
        Log.d("WifiModule", "Timestamp after addNetworkSuggestions : " + ts);

        Log.d("WifiModule", "status from wifiManager.addNetworkSuggestion : " + status);
        if (status != WifiManager.STATUS_NETWORK_SUGGESTIONS_SUCCESS) {
        // do error handling here…
            Log.d("WifiModule", "status != WifiManager.STATUS_NETWORK_SUGGESTIONS_SUCCESS");
        }else{

            tsLong = System.currentTimeMillis();
            ts = tsLong.toString();
            Log.d("WifiModule", "Timestamp before starting wifiIntent : " + ts);

            //Go to Wifi Page - works
            //if PERMIS
            Intent wifiIntent = new Intent(Settings.ACTION_WIFI_SETTINGS);
            wifiIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(wifiIntent);

        }

        // Optional (Wait for post connection broadcast to one of your suggestions)
        /*final IntentFilter intentFilter =
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
                Intent wifiIntent = new Intent(Settings.ACTION_WIFI_SETTINGS);
                wifiIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(wifiIntent);

                /*Intent wifiIntent = new Intent(Settings.ACTION_WIFI_SETTINGS);
                wifiIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(wifiIntent);

                //Toast to show to the user
                CharSequence text = "Connect To :  " + ssid;
                int duration = Toast.LENGTH_LONG;

                Toast toast = Toast.makeText(context, text, duration);
                toast.show();
            }
        };
        context.registerReceiver(broadcastReceiver, intentFilter);*/
    }

    @ReactMethod
    public void connectToWifiSpecifier(final String ssid, final String password) {

        WifiNetworkSpecifier wifiNetworkSpecifier = new WifiNetworkSpecifier.Builder()
                .setSsid(ssid)
                .setWpa2Passphrase(password)
                .build();

        NetworkRequest networkRequest = new NetworkRequest.Builder()
                .addTransportType(NetworkCapabilities.TRANSPORT_WIFI)
                .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
                .setNetworkSpecifier(wifiNetworkSpecifier)
                .build();

        ReactApplicationContext context = getReactApplicationContext();

        ConnectivityManager connectivityManager = (ConnectivityManager)context.getSystemService(Context.CONNECTIVITY_SERVICE);
        connectivityManager.requestNetwork(networkRequest, new ConnectivityManager.NetworkCallback());

        }

    @ReactMethod
    public void connectToWifiRequest(final String ssid, final String password) {

        ReactApplicationContext context = getReactApplicationContext();

        //Added our wifi to the system to consider

        WifiNetworkSpecifier wifiNetworkSpecifier = new WifiNetworkSpecifier.Builder()
                    .setSsid(ssid)
                    .setWpa2Passphrase(password)
                    .build();

        NetworkRequest networkRequest = new NetworkRequest.Builder()
                    .addTransportType(NetworkCapabilities.TRANSPORT_WIFI)
                    .setNetworkSpecifier(wifiNetworkSpecifier)
                    .build();

        ConnectivityManager connectivityManager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        connectivityManager.requestNetwork(networkRequest, new ConnectivityManager.NetworkCallback(){
            @Override
            public void onUnavailable() {
                final WifiNetworkSuggestion networkSuggestion  = new WifiNetworkSuggestion.Builder()
                        .setSsid(ssid)
                        .setWpa2Passphrase(password)
                        .setIsAppInteractionRequired(true)
                        .build();

                List<WifiNetworkSuggestion> suggestionsList =
                        new ArrayList<WifiNetworkSuggestion>();
                suggestionsList.add(networkSuggestion);

                final int status = wifiManager.addNetworkSuggestions(suggestionsList);


            }
        });


    }
}