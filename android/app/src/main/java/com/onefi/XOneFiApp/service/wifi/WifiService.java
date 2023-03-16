package com.onefi.XOneFiApp.service.wifi;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import com.onefi.XOneFiApp.MainActivity;
import com.onefi.XOneFiApp.R;
import com.onefi.XOneFiApp.entities.Account;
import com.onefi.XOneFiApp.entities.ClientSession;
import com.onefi.XOneFiApp.entities.OneFiConfig;
import com.onefi.XOneFiApp.storage.OneFiStorage;
import com.onefi.XOneFiApp.udp.ConnectionHelper;
import com.onefi.XOneFiApp.utils.Crypto;
import com.onefi.XOneFiApp.api.ClientSessionApi;

import org.apache.commons.codec.binary.StringUtils;
import org.web3j.abi.datatypes.Int;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;


public class WifiService extends Service {
    private ScheduledExecutorService scheduler;
    private int count;

    private Thread task;

    public WifiService() {
    }

    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
//        while (true)
        Log.d("start client daemon", "start wifi client daemon");
        Context applicationContext = this.getApplicationContext();
        OneFiStorage oneFiStorage = OneFiStorage.getInstance(applicationContext);
        ClientSessionApi clientSessionApi = new ClientSessionApi(applicationContext);
//        String userPassword = intent.getStringExtra("password");
//        String userPassword = "ChangeMe";
        String userPassword = "seitlab123!@";
//        String userPassword = "seitlab123";
        try {
            oneFiStorage.configIfAbsent();
            ClientSession clientSession = clientSessionApi.getData();
            clientSession.setScanCounter(0);
            clientSession.setSackNumber(0);
            clientSession.setInitiatedSackNumber(0);
            clientSession.setStatus(ClientSession.ClientSessionStatus.CLOSED.getValue());
            clientSessionApi.setClientSession(clientSession);
            OneFiConfig config = oneFiStorage.getConfig();
            Account account = config.getAccount();
            if (account == null) {
                return super.onStartCommand(intent, flags, startId);
            }
            String encryptedPrk = account.getEncryptedPrk();
            if (encryptedPrk == null || encryptedPrk.equals("")) {
                return super.onStartCommand(intent, flags, startId);
            }
            String decryptPrivateKey = Crypto.decrypt(encryptedPrk, userPassword);
            showNotification();
            ClientWorker clientWorker = new ClientWorker(
                    applicationContext,
                    decryptPrivateKey,
                    userPassword,
                    config);
//            clientWorker.run();
            task= new Thread(() -> {
                while (true) {
                    try {
                        final CountDownLatch latch = new CountDownLatch(1);
                        clientWorker.run(new AsyncResultListener() {
                            @Override
                            public void onSuccess(ConnectionHelper.ConnectionResult o) {
                                latch.countDown();
                            }

                            @Override
                            public void onFailed(ConnectionHelper.ConnectionResult e) {
                                latch.countDown();
                            }
                        });
                        latch.await();
                        Thread.sleep(5000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            });
            task.start();

//            scheduler = Executors.newSingleThreadScheduledExecutor();
//            scheduler.scheduleAtFixedRate(clientWorker, 0, 5, TimeUnit.SECONDS);
        } catch (Exception e) {
            Log.d("init config error", "...................");
            Log.d("init config error", e.getMessage());
            e.getStackTrace();
            Log.e("init config error", "...................");


        }

        return super.onStartCommand(intent, flags, startId);
    }

    private void showNotification() {
        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            NotificationChannel notificationChannel = new NotificationChannel("Onefi Service", "notification", NotificationManager.IMPORTANCE_DEFAULT);
            notificationManager.createNotificationChannel(notificationChannel);
        }
        Intent mainIntent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, mainIntent, 0);
        Notification notification = new NotificationCompat.Builder(this, "Onefi Service")
                .setContentTitle("Onefi is started")
                .setContentText("start connect")
//                .setSmallIcon(R.drawable.bundle_assets_settingsfilledicon)
                .setContentIntent(pendingIntent).build();
        startForeground(1, notification);
    }

    @Override
    public void onDestroy() {
        Log.d("client damon stop", "stop client daemon");
//        scheduler.shutdown();
        if (task != null) {
            task.interrupt();
        }
        super.onDestroy();
    }
}