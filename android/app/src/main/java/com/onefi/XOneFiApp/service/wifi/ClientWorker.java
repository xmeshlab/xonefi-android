package com.onefi.XOneFiApp.service.wifi;

import android.content.Context;
import android.net.wifi.ScanResult;
import android.util.Log;

import androidx.annotation.Nullable;

import com.google.gson.reflect.TypeToken;
import com.onefi.XOneFiApp.api.ClientSessionApi;
import com.onefi.XOneFiApp.api.SACKNumberApi;
import com.onefi.XOneFiApp.api.SSIDApi;
import com.onefi.XOneFiApp.entities.ClientSession;
import com.onefi.XOneFiApp.entities.Command;
import com.onefi.XOneFiApp.entities.Message;
import com.onefi.XOneFiApp.entities.OneFiConfig;
import com.onefi.XOneFiApp.storage.OneFiStorage;
import com.onefi.XOneFiApp.udp.ConnectionHelper;
import com.onefi.XOneFiApp.udp.SACK;
import com.onefi.XOneFiApp.udp.HandoverHelper;
import com.onefi.XOneFiApp.utils.JsonUtil;
import com.onefi.XOneFiApp.utils.SSIDUtil;
import com.onefi.XOneFiApp.utils.TimeUtil;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

import static com.onefi.XOneFiApp.udp.SACK.SACK_OK;


//public class ClientWorker implements Runnable {
public class ClientWorker {
    private Context context;
    private String deCryptedPrivateKey;
    private String userPassword;
    private OneFiConfig oneFiConfig;
    OneFiStorage oneFiStorage;

    public static interface Callback {
        void callback(@Nullable Object obj) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException;
    }

    public ClientWorker(Context ctx, String deCryptedPrivateKey, String userPassword, OneFiConfig config) {
        this.context = ctx;
        this.deCryptedPrivateKey = deCryptedPrivateKey;
        this.userPassword = userPassword;
        this.oneFiConfig = config;
        this.oneFiStorage = OneFiStorage.getInstance(context);
    }

    //   @Override
    public void run(AsyncResultListener listener) {
        OneFiConfig config = oneFiStorage.getConfig();
        Log.d("InitiatedSackNumber", String.valueOf(config.getClientSession().getInitiatedSackNumber()));
        Log.d("SackNumber", String.valueOf(config.getClientSession().getSackNumber()));
        doTask(userPassword, deCryptedPrivateKey, listener);
        Log.d("ClientWorker running", "");
    }

    private void doTask(String userPassword, String privateKey, AsyncResultListener callback) {
        AtomicReference<OneFiConfig> atomicConfig = new AtomicReference<>(this.oneFiConfig);
        SSIDManager ssidManager = new SSIDManager(context);
        ssidManager.scan(scanResultList -> {
            Log.d("scanResultList", scanResultList.toString());
            ArrayList<String> ssidList = new ArrayList<>();
            for (SSIDManager.ScanResultWithRSISS scanResult : scanResultList) {
                ScanResult res = scanResult.getScanResult();
                if (res != null) {
                    ssidList.add(res.SSID);
                }
            }
            Log.d("ssidList", ssidList.toString());
            SSIDApi ssidApi = new SSIDApi(context);
            ssidApi.saveSSIDs(ssidList);
            if (ssidList.size() == 0) {
                AsyncResultHelper.failed("found no ssid", callback);
                return;
            }
            SSIDManager.ScanResultWithRSISS fastScanResultWithRSSI = SSIDUtil.fastHostSpotSelectionNg2(scanResultList, oneFiConfig);
            if (fastScanResultWithRSSI == null) {
                AsyncResultHelper.failed("found no ssid", callback);
                Log.d("found no ssid", ".........");
                return;
            }
            String chosenSSID = fastScanResultWithRSSI.getScanResult().SSID;
            SSIDUtil.DeserializeSSIDResult deserializeSSIDResult = SSIDUtil.deserializeSSID(chosenSSID);

            Log.d("DESEREALIZED: {}", String.valueOf(deserializeSSIDResult));

            ClientSession clientSession = atomicConfig.get().getClientSession();
            ClientSessionApi clientSessionApi = new ClientSessionApi(context);

            if (clientSession.getStatus() == ClientSession.ClientSessionStatus.ACTIVE.getValue()) {
                if (atomicConfig.get().getClientSession().isPft() || atomicConfig.get().getClientSession().isPft()) {
                    handover(
                            atomicConfig.get(),
                            privateKey,
                            scanResultList,
                            chosenSSID,
                            deserializeSSIDResult);
                }

                if (clientSession.isPft()) {
                    if (System.currentTimeMillis() / 1000 >= clientSession.getLastSackTimestamp() + 50) {
                        Log.d("Start send sack:", "......");
                        Log.d("Start send sack:", String.format("current sack is %d", clientSession.getSackNumber()));
                        Log.d("Start send sack:", String.format("next sack is %d", clientSession.getSackNumber() + 1));

                        if (clientSession.getSackNumber() == clientSession.getNumberOfSacks()) {
                            Log.d("Session is Over", ">>>>>");
                        } else {
                            sendNextSACK(userPassword, privateKey, atomicConfig, clientSession);
                        }
                    }
                }
            } else if (clientSession.getStatus() == ClientSession.ClientSessionStatus.HANDSHAKE.getValue()) {
                if (TimeUtil.getCurrentTimeStamp() >= clientSession.getExpirationTimestamp()) {
                    setConnectionExpired(clientSession);
                    return;
                }
            } else {
                Log.d("TAG", "The session is neither active, nor in the handshake mode.");
                if (clientSession.getScanCounter() == 0) {
                    ConnectionHelper.initialConnection(context, deserializeSSIDResult, userPassword, privateKey, atomicConfig.get(),
                            new AsyncResultListener() {
                                @Override
                                public void onSuccess(ConnectionHelper.ConnectionResult o) {
                                    String message = o.getMessage();
                                    Log.d("connection Success", message);
                                    AsyncResultHelper.success(message!= null ? message :"connection Success", callback);
                                }

                                @Override
                                public void onFailed(ConnectionHelper.ConnectionResult e) {
                                    String error = e.getError();
                                    Log.e("Connection error", error);
                                    AsyncResultHelper.failed(error != null ? error : "Connection error", callback);

                                }
                            }
                    );
                    return;
                } else if (clientSession.getScanCounter() >= 15) {
                    clientSession.setScanCounter(0);
                    clientSessionApi.setClientSession(clientSession);
                    AsyncResultHelper.success("reset scanCount", callback);
                } else {
                    Log.d("waitFor:", "Wait for previous scan to complete");
                    clientSession.setScanCounter(clientSession.getScanCounter() + 1);
                    clientSessionApi.setClientSession(clientSession);
                    AsyncResultHelper.success("wait for previous scan to complete", callback);
                }
                return;

            }
            AsyncResultHelper.success("service tick", callback);
        });
    }

    private void setConnectionExpired(ClientSession clientSession) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
        clientSession.setStatus(ClientSession.ClientSessionStatus.EXPIRED.getValue());
        ClientSessionApi clientSessionApi = new ClientSessionApi(context);
        clientSessionApi.setClientSession(clientSession);

    }

    private void sendNextSACK(String userPassword, String privateKey, AtomicReference<OneFiConfig> atomicConfig, ClientSession clientSession) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
        SACKNumberApi sackNumberApi = new SACKNumberApi(context);
        int initiatedSACKNumber = sackNumberApi.getInitiatedSACKNumber();
        if (clientSession.getInitiatedSackNumber() == clientSession.getSackNumber()) {
            sackNumberApi.setInitiatedSACKNumber(initiatedSACKNumber + 1);
//                        atomicConfig = oneFiStorage
            OneFiConfig newConfig = oneFiStorage.getConfig();
            atomicConfig.set(newConfig);
            ClientSession clientSession1 = newConfig.getClientSession();
            if (clientSession1.getInitiatedSackNumber() != initiatedSACKNumber + 1) {
                Log.d("@DEB5: catch ya", "");
            }
            ClientSessionApi clientSessionApi = new ClientSessionApi(context);
            SACK.sendNextSACK(newConfig, userPassword, privateKey, clientSessionApi,
                    byteArray -> {
                        String response2 = new String((byte[]) byteArray);
                        TypeToken<Message<SACK.AnswerSACKArguments>> messageTypeToken = new TypeToken<Message<SACK.AnswerSACKArguments>>() {
                        };
                        Message<SACK.AnswerSACKArguments> message = JsonUtil.fromJson(response2, messageTypeToken);
                        if (message == null) {
                            return;
                        }
                        Command<SACK.AnswerSACKArguments> command = message.getCommand();
                        if (command == null) {
                            return;
                        }
                        if (command.arguments.getAnswer().equals(SACK_OK)) {
                            ClientSession newConfigClientSession = newConfig.getClientSession();
                            newConfigClientSession.setSackok(message);
                            try {
                                clientSessionApi.setClientSession(newConfigClientSession);
                            } catch (InvocationTargetException | NoSuchMethodException | IllegalAccessException e) {
                                e.printStackTrace();
                            }
                        }

                    });

        }
    }

    private void handover(OneFiConfig config,
                          String privateKey,
                          List<SSIDManager.ScanResultWithRSISS> scanResultList,
                          String chosenSSID,
                          SSIDUtil.DeserializeSSIDResult deserializeSSIDResult
    ) {
        SSIDManager.ScanResultWithRSISS bestCandidateScanResult = SSIDUtil.fastHotSpotSelectionNg(scanResultList);
        Log.d("BEST CANDIDATE SSID:  ", bestCandidateScanResult.getScanResult().SSID);
        Log.d("clientSession.SSID", config.getClientSession().getSsid());
        String bestCandidateSSID = bestCandidateScanResult.getScanResult().SSID;
        if (HandoverHelper.handoverMatch(config.getClientSession().getSsid(), bestCandidateSSID)) {
            Log.d("Handover match:", bestCandidateSSID);
            if (config.isAllowHandover()) {
                HandoverHelper.initiateHandover(context, deserializeSSIDResult, chosenSSID, privateKey, config);
            } else {
//                AsyncResultHelper.failed("not allow Handover");
            }
        }
    }
}
