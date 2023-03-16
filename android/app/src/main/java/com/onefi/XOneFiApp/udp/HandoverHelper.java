package com.onefi.XOneFiApp.udp;


import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;

import com.onefi.XOneFiApp.entities.CallHandoverResponse;
import com.onefi.XOneFiApp.entities.ClientSession;
import com.onefi.XOneFiApp.entities.OneFiConfig;
import com.onefi.XOneFiApp.service.wifi.AsyncResultHelper;
import com.onefi.XOneFiApp.service.wifi.AsyncResultListener;
import com.onefi.XOneFiApp.storage.OneFiStorage;
import com.onefi.XOneFiApp.utils.HotSpotTypeUtil;
import com.onefi.XOneFiApp.utils.JsonUtil;
import com.onefi.XOneFiApp.utils.SSIDUtil;
import com.onefi.XOneFiApp.utils.TimeUtil;
import com.thanosfisherman.wifiutils.WifiUtils;
import com.thanosfisherman.wifiutils.wifiConnect.ConnectionErrorCode;
import com.thanosfisherman.wifiutils.wifiConnect.ConnectionSuccessListener;
import com.onefi.XOneFiApp.api.ClientSessionApi;

import java.lang.reflect.InvocationTargetException;
import java.nio.charset.StandardCharsets;

public class HandoverHelper {
    public static void initiateHandover(Context context,
                                        SSIDUtil.DeserializeSSIDResult deserializeSSIDResult,
                                        String chosenSSID,
                                        String privateKey,
                                        OneFiConfig config
    ) {
        SSIDUtil.DeserializeSSIDResult ssidResult = SSIDUtil.deserializeSSID(chosenSSID);
        String password = ssidResult.getPrefix();
        WifiUtils.withContext(context).connectWith(chosenSSID, password).onConnectionResult(new ConnectionSuccessListener() {
            @Override
            public void success() {
                HotSpotTypeUtil.HotSpotType hotSpotType = HotSpotTypeUtil.decodeHotSpotType(deserializeSSIDResult.getHotSpotType());
                String accessMethod = hotSpotType.getAccessMethod();
                HotSpotTypeUtil.HotSpotAmount amount = HotSpotTypeUtil.getAmount(accessMethod, deserializeSSIDResult);
                if (amount == null) {
                    Log.e("UnknownAccessType ", accessMethod);
//                    AsyncResultHelper.failed("UnknownAccessType "+ accessMethod, callback);
                    return;
                }
                Log.d("calculatedSackAmount", String.valueOf(amount.getCalculatedSackAmount()));
                Log.d("calculatedPafrenAmount", String.valueOf(amount.getCalculatedPafrenAmount()));
                Log.d("calculatedNumberOfSacks", String.valueOf(amount.getCalculatedNumberOfSacks()));
                Log.d("pafrenLength", String.valueOf(amount.getPafrenLength()));
                ClientSession.Builder clientSessionBuilder = new ClientSession.Builder();
                ClientSession clientSession = clientSessionBuilder
                        .status(ClientSession.ClientSessionStatus.HANDSHAKE.getValue())
                        .ssid(chosenSSID)
                        .ip(deserializeSSIDResult.getIp())
                        .port(deserializeSSIDResult.getPort())
                        .prefix(deserializeSSIDResult.getPrefix())
                        .pft(accessMethod.equals("pft"))
                        .pfd(accessMethod.equals("pfd"))
                        .free(accessMethod.equals("free"))
                        .restricted(accessMethod.equals("restricted"))
                        .sackNumber(0)
                        .expirationTimestamp(TimeUtil.getCurrentTimeStamp() * config.getHandshakeTime())
                        .cost(deserializeSSIDResult.getCost())
                        .pafrenPercentage(deserializeSSIDResult.getPafren())
                        .sackAmount(amount.getCalculatedSackAmount())
                        .pafrenAmount(amount.getCalculatedPafrenAmount())
                        .numberOfSacks(amount.getCalculatedNumberOfSacks())
                        .initiatedSackNumber(0).build();
                ClientSessionApi clientSessionApi = new ClientSessionApi(context);
                try {
                    clientSessionApi.setClientSession(clientSession);
                    OneFiConfig newConfig = OneFiStorage.getInstance(context).getConfig();
                    Log.d("HandoverStageInitiated", "");
                    ClientSession currentClientSession = newConfig.getClientSession();
                    Log.d("clientSession", currentClientSession.toString());

                    CallHandover.callHandover(
                            deserializeSSIDResult.getIp(),
                            deserializeSSIDResult.getPort(),
                            privateKey,
                            currentClientSession.getSessionId(),
                            currentClientSession.getSackok(),
                            result -> {
                                try {
                                    String res = new String((byte[]) result, StandardCharsets.UTF_8);
                                    CallHandoverResponse response = (CallHandoverResponse) JsonUtil.fromJson(res, CallHandoverResponse.class);
                                    if ("HANDOVER-OK".equals(response.getCommand().getArguments().getAnswer())) {
                                        ClientSession newClientSession = config.getClientSession();
                                        newClientSession.setSsid(deserializeSSIDResult.getSsid());
                                        newClientSession.setProviderAddress(response.getCommand().getFrom());
                                        newClientSession.setIp(deserializeSSIDResult.getIp());
                                        newClientSession.setPort(deserializeSSIDResult.getPort());
                                        clientSessionApi.setClientSession(newClientSession);
//                                        AsyncResultHelper.success("HANDOVER-OK", callback);
                                    }
                                } catch (Exception e) {
                                    e.printStackTrace();
//                                    AsyncResultHelper.failed(e.getMessage(), callback);
                                }
                            }
                    );
                } catch (Exception e) {
//                    AsyncResultHelper.failed(e.getMessage(), callback);
                    e.printStackTrace();
                }
            }

            @Override
            public void failed(@NonNull ConnectionErrorCode errorCode) {
//                AsyncResultHelper.failed("connect wifi error", callback);
            }
        });
    }

    /**
     * Determine if two OneFi SSIDs are eligible for session handover.
     * @param  ssid - source SSID
     * @param  ssid2 - destinatin SSID
     * @returns  true if eligible, false otherwise.
     */
    public static boolean handoverMatch(String ssid, String ssid2) {
        SSIDUtil.DeserializeSSIDResult dssid1 = SSIDUtil.deserializeSSID(ssid);
        SSIDUtil.DeserializeSSIDResult dssid2 = SSIDUtil.deserializeSSID(ssid2);
        if (!ssid.equals(ssid2)) {
            return dssid1.getPrefix().equals(dssid2.getPrefix())
                    &&
                    dssid1.getHotSpotType() == dssid2.getHotSpotType()
                    &&
                    dssid1.getCost() == dssid2.getCost()
                    &&
                    dssid1.getPafren() == dssid2.getPafren();
        }

        return false;
    }
}
