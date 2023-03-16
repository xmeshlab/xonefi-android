package com.onefi.XOneFiApp.udp;

import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;

import com.google.gson.reflect.TypeToken;
import com.onefi.XOneFiApp.api.ClientSessionApi;
import com.onefi.XOneFiApp.entities.ClientSession;
import com.onefi.XOneFiApp.entities.Command;
import com.onefi.XOneFiApp.entities.EncodeData;
import com.onefi.XOneFiApp.entities.Message;
import com.onefi.XOneFiApp.entities.OneFiConfig;
import com.onefi.XOneFiApp.entities.UdpResponseArgs;
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

import org.web3j.crypto.Credentials;

import java.lang.reflect.InvocationTargetException;
import java.nio.charset.StandardCharsets;
import java.util.UUID;


public class ConnectionHelper {
    public static class ConnectionResult {
        private boolean hasError;
        private String message;
        private String error;

        public boolean isHasError() {
            return hasError;
        }

        public void setHasError() {
            this.hasError = true;
        }

        public String getMessage() {
            return message;
        }

        public String getError() {
            return error;
        }

        public void setError(String e) {
            this.hasError = true;
            this.error = e;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }


    public static void initialConnection(Context context,
                                         SSIDUtil.DeserializeSSIDResult deserializeSSIDResult,
                                         String userPassword,
                                         String privateKey,
                                         OneFiConfig config,
                                         AsyncResultListener connectionResultListener
    ) {
        String chosenSSID = deserializeSSIDResult.getSsid();
        Log.d("Connection Info", "Initiating connection " + JsonUtil.toJson(deserializeSSIDResult));
        Log.d("Connection Info", "chosen ssid" + chosenSSID);
        WifiUtils.withContext(context)
                .connectWith(chosenSSID, userPassword)
                .onConnectionResult(new ConnectionSuccessListener() {
                    @Override
                    public void success() {
                        Log.d("Connection Info", "Successfully connected to " + chosenSSID);
                        Log.d("Connection Info", "Initiating the handshake stage");
                        HotSpotTypeUtil.HotSpotType hotSpotType = HotSpotTypeUtil.decodeHotSpotType(deserializeSSIDResult.getHotSpotType());
                        String accessMethod = hotSpotType.getAccessMethod();
                        HotSpotTypeUtil.HotSpotAmount amount = HotSpotTypeUtil.getAmount(accessMethod, deserializeSSIDResult);
                        if (amount == null) {
                            Log.e("ERROR:", "Unknown access type: " + accessMethod);
                            AsyncResultHelper.failed("Unknown access type: " + accessMethod, connectionResultListener);
                            return;
                        }
                        ClientSession.Builder builder = new ClientSession.Builder();
                        String ip = deserializeSSIDResult.getIp();
                        ClientSession newClientSession = builder.status(ClientSession.ClientSessionStatus.HANDSHAKE.getValue())
                                .ssid(chosenSSID)
                                .ip(ip)
                                .prefix(deserializeSSIDResult.getPrefix())
                                .pfd(accessMethod.equals("pfd"))
                                .pft(accessMethod.equals("pft"))
                                .free(accessMethod.equals("free"))
                                .restricted(accessMethod.equals("restricted"))
                                .sackNumber(0)
                                .expirationTimestamp(TimeUtil.getCurrentTimeStamp() + config.getHandshakeTime())
                                .cost(deserializeSSIDResult.getCost())
                                .pafrenPercentage(deserializeSSIDResult.getPafren())
                                .sackAmount(amount.getCalculatedSackAmount())
                                .pafrenAmount(amount.getCalculatedPafrenAmount())
                                .numberOfSacks(amount.getCalculatedNumberOfSacks())
                                .initiatedSackNumber(0)
                                .sackok(new Message())
                                .providerAddress("")
                                .lastSackTimestamp(0)
                                .scanCounter(0)
                                .pafrenTimestamp(0)
                                .sessionId("")
                                .build();
                        ClientSessionApi clientSessionApi = new ClientSessionApi(context);

                        try {
                            clientSessionApi.setClientSession(newClientSession);
                            Thread.sleep(5000);
                            String sessionId = UUID.randomUUID().toString();

                            String port = String.valueOf(deserializeSSIDResult.getPort());
                            CallHello.callHello(
                                    ip,
                                    port,
                                    privateKey,
                                    sessionId,
                                    r -> {
                                        try {
                                            String json = new String((byte[]) r);
                                            Log.d("callHello", "PROVIDER'S RESPONSE:" + json);

                                            TypeToken<Message<UdpResponseArgs>> messageTypeToken = new TypeToken<Message<UdpResponseArgs>>() {
                                            };
                                            Message<UdpResponseArgs> response = JsonUtil.fromJson(json, messageTypeToken);
                                            String helloAnswer = response.getCommand().arguments.getAnswer();
                                            long currentTimeStamp = TimeUtil.getCurrentTimeStamp();

                                            if (CallHello.OK.equals(helloAnswer)) {
                                                callPafren(
                                                        currentTimeStamp,
                                                        hotSpotType,
                                                        amount,
                                                        ip,
                                                        clientSessionApi,
                                                        sessionId,
                                                        port,
                                                        response,
                                                        deserializeSSIDResult,
                                                        privateKey,
                                                        config,
                                                        connectionResultListener
                                                );
                                            } else if (CallHello.UNLIMITED.equals(helloAnswer)) {
                                                Log.d("CallHello.UNLIMITED:", "UNLIMITED SESSION ACTIVATED BY THE PROVIDER.");
                                                ClientSession clientSession = clientSessionApi.getData();
                                                clientSession.setStatus(ClientSession.ClientSessionStatus.ACTIVE.getValue());
                                                clientSession.setExpirationTimestamp(currentTimeStamp);
                                                clientSession.setSackNumber(1);
                                                clientSession.setLastSackTimestamp(currentTimeStamp * 3600 * 24 * 365);
                                                clientSessionApi.setClientSession(clientSession);
                                            } else {
                                                Log.d("readyToServer:", "The provider is not ready to serve. Continue connecting.");
                                            }
                                        } catch (Exception e) {
                                            AsyncResultHelper.failed(e.getMessage(), connectionResultListener);
                                            e.printStackTrace();
                                        }
                                    }
                            );

                        } catch (InvocationTargetException | NoSuchMethodException |
                                 IllegalAccessException | InterruptedException e) {
                            e.printStackTrace();
                        }

                    }

                    @Override
                    public void failed(@NonNull ConnectionErrorCode errorCode) {
                        AsyncResultHelper.failed("Unable to connect to" + deserializeSSIDResult.getSsid(), connectionResultListener);
                        Log.e("Connection error", "Unable to connect to" + deserializeSSIDResult.getSsid());
                    }
                }).start();

    }

    private static void callPafren(long currentTimeStamp,
                                   HotSpotTypeUtil.HotSpotType hotSpotType,
                                   HotSpotTypeUtil.HotSpotAmount amount,
                                   String ip,
                                   ClientSessionApi clientSessionApi,
                                   String sessionId,
                                   String port,
                                   Message<UdpResponseArgs> response,
                                   SSIDUtil.DeserializeSSIDResult deserializeSSIDResult,
                                   String privateKey,
                                   OneFiConfig config,
                                   AsyncResultListener connectionResultListener
    ) {
        long currentAmount = (long) (amount.getCalculatedPafrenAmount() * Math.pow(10, 12));
        Log.d("DEB", "deserealized_ssid.ip: " + ip);
        Log.d("DEB", "deserealized_ssid.port: " + deserializeSSIDResult.getPort());
        Log.d("DEB", "private_key: " + privateKey);
        Command<UdpResponseArgs> responseCommand = response.getCommand();
        Log.d("DEB", "response_json.command.session: " + responseCommand.session);
        Log.d("DEB", "response_json.command.uuid: " + responseCommand.uuid);
        Log.d("DEB", "current_amount: " + currentAmount);
        Log.d("DEB", "current_timestamp: " + currentTimeStamp);
        Log.d("DEB", "config_json.account.address: " + config.getAccount().getAddress());
        Log.d("DEB", "response_json.command.from: " + responseCommand.from);
        EncodeData encodeData = new EncodeData();
        encodeData.setClient(config.getAccount().getAddress());
        encodeData.setHotspot(response.getCommand().from);
        encodeData.setCurrentAmount(currentAmount);
        long pafrenTimeStamp = (long) (currentTimeStamp + amount.getPafrenLength());
//        encodeData.setCurrentTimeStamp(pafrenTimeStamp);
        encodeData.setCurrentTimeStamp(pafrenTimeStamp);
        encodeData.setPrk(privateKey);
        CallPafren.callPafren(
                ip,
                port,
                privateKey,
                sessionId,
                currentAmount,
                response.getCommand().re,
                pafrenTimeStamp,
                CallPafren.encodePafren(encodeData, privateKey),
                callPafrenResponse -> {
                    TypeToken<Message<UdpResponseArgs>> typeToken = new TypeToken<Message<UdpResponseArgs>>() {
                    };
                    String str = new String((byte[]) callPafrenResponse, StandardCharsets.UTF_8);
                    Message<UdpResponseArgs> pafrenResMessage = JsonUtil.fromJson(
                            str, typeToken);

//                    sackData.setHotspot(pafrenResMessage.getCommand().from);
                    Credentials credentials = Credentials.create(privateKey);
                    String pubaddress = credentials.getAddress();

                    Command<UdpResponseArgs> pafrenCommand = pafrenResMessage.getCommand();
                    if (CallPafren.OK.equals(pafrenCommand.arguments.getAnswer())) {

                        Log.d("AfterCallPafren:", "Initiating sack sequence");
                        ClientSession clientSession = config.getClientSession();
                        clientSession.setInitiatedSackNumber(1);
                        clientSession.setPafrenTimestamp(pafrenTimeStamp);
                        clientSession.setProviderAddress(pafrenCommand.from);
                        clientSession.setSessionId(sessionId);
                        clientSession.setStatus(ClientSession.ClientSessionStatus.ACTIVE.getValue());
                        clientSessionApi.setClientSession(clientSession);
                        Log.d("AfterCallPafren:", "Calling the first sack");
                        Log.d("getSackAmount", String.valueOf(clientSession.getSackAmount()));
                        Log.d("getSackNumber", String.valueOf(clientSession.getSackNumber()));
                        long currentSackAmount = (long) (clientSession.getSackAmount() * (clientSession.getSackNumber() + 1) * Math.pow(10, 12));
                        Log.d("CALCULATED_SACK_AMOUNT", String.valueOf(currentSackAmount));
                        EncodeData sackData = new EncodeData();
//                    OneFiConfig oneFiConfig = new OneFiConfig();
                        String address = config.getAccount().getAddress();
//                    String address = pafrenResMessage.getCommand().from;
                        sackData.setClient(address);
                        sackData.setHotspot(pafrenResMessage.getCommand().from);
                        sackData.setCurrentAmount(currentAmount);
                        sackData.setCurrentTimeStamp(pafrenTimeStamp);
                        sackData.setPrk(privateKey);
                        if ("pft".equals(hotSpotType.getAccessMethod())) {
                            SACK.callSACK(
                                    ip,
                                    deserializeSSIDResult.getPort(),
                                    privateKey,
                                    pafrenCommand.session,
                                    pafrenCommand.uuid,
                                    currentSackAmount,
                                    pafrenTimeStamp,
                                    SACK.encodeSACK(sackData),
                                    callSackResponse -> {
                                        try {
                                            String callSACKJSON = (String) callSackResponse;
                                            TypeToken<Message<UdpResponseArgs>> SACKResToken = new TypeToken<Message<UdpResponseArgs>>() {
                                            };
                                            Message<UdpResponseArgs> sackResponseMessage = JsonUtil.fromJson(callSACKJSON, SACKResToken);
                                            if (SACK.SACK_OK.equals(sackResponseMessage.getCommand().arguments.getAnswer())) {
                                                Log.d("SessionActive:", "SACK is accepted by provider! Session is active.");
                                                clientSession.setStatus(ClientSession.ClientSessionStatus.ACTIVE.getValue());
                                                clientSession.setExpirationTimestamp(pafrenTimeStamp);
                                                clientSession.setSackNumber(1);
                                                clientSession.setLastSackTimestamp(sackResponseMessage.getCommand().timestamp);
                                                clientSession.setSackok(sackResponseMessage);
                                                clientSessionApi.setClientSession(clientSession);
                                                AsyncResultHelper.success("call Sack success", connectionResultListener);
                                            }
                                        } catch (Exception e) {
                                            Log.e("parseSACKResError:", e.getMessage());
                                            AsyncResultHelper.failed("parseSACKResError:" + e.getMessage(), connectionResultListener);
                                            e.printStackTrace();
                                        }

                                    }
                            );
                        }
                    } else {
                        AsyncResultHelper.failed("call pafrent error", connectionResultListener);
                    }
                },
                error -> {
                    AsyncResultHelper.failed("send pafrent error", connectionResultListener);
                }
        );
    }


    private static void callSACK(HotSpotTypeUtil.HotSpotType hotSpotType,
                                 String ip,
                                 ClientSessionApi clientSessionApi,
                                 String sessionId,
                                 SSIDUtil.DeserializeSSIDResult deserializeSSIDResult,
                                 String privateKey,
                                 OneFiConfig config,
                                 long currentTimeStamp,
                                 EncodeData encodeData,
                                 long pafrenTimeStamp,
                                 Command<UdpResponseArgs> pafrenCommand,
                                 AsyncResultListener connectionResultListener
    ) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
        Log.d("AfterCallPafren:", "Initiating sack sequence");
        ClientSession clientSession = config.getClientSession();
        clientSession.setInitiatedSackNumber(1);
        clientSession.setPafrenTimestamp(pafrenTimeStamp);
        clientSession.setProviderAddress(pafrenCommand.from);
        clientSession.setSessionId(sessionId);
        clientSession.setStatus(ClientSession.ClientSessionStatus.ACTIVE.getValue());
        clientSessionApi.setClientSession(clientSession);
        Log.d("AfterCallPafren:", "Calling the first sack");
        Log.d("getSackAmount", String.valueOf(clientSession.getSackAmount()));
        Log.d("getSackNumber", String.valueOf(clientSession.getSackNumber()));
        long currentSackAmount = (long) (clientSession.getSackAmount() * (clientSession.getSackNumber() + 1) * Math.pow(10, 12));
        Log.d("CALCULATED_SACK_AMOUNT", String.valueOf(currentSackAmount));
        if ("pft".equals(hotSpotType.getAccessMethod())) {
            SACK.callSACK(
                    ip,
                    deserializeSSIDResult.getPort(),
                    privateKey,
                    pafrenCommand.session,
                    pafrenCommand.uuid,
                    currentSackAmount,
                    currentTimeStamp,
                    SACK.encodeSACK(encodeData),
                    callSackResponse -> {
                        try {
                            String callSACKJSON = (String) callSackResponse;
                            TypeToken<Message<UdpResponseArgs>> SACKResToken = new TypeToken<Message<UdpResponseArgs>>() {
                            };
                            Message<UdpResponseArgs> sackResponseMessage = JsonUtil.fromJson(callSACKJSON, SACKResToken);
                            if (SACK.SACK_OK.equals(sackResponseMessage.getCommand().arguments.getAnswer())) {
                                Log.d("SessionActive:", "SACK is accepted by provider! Session is active.");
                                clientSession.setStatus(ClientSession.ClientSessionStatus.ACTIVE.getValue());
                                clientSession.setExpirationTimestamp(pafrenTimeStamp);
                                clientSession.setSackNumber(1);
                                clientSession.setLastSackTimestamp(sackResponseMessage.getCommand().timestamp);
                                clientSession.setSackok(sackResponseMessage);
                                clientSessionApi.setClientSession(clientSession);
                                AsyncResultHelper.success("call Sack success", connectionResultListener);
                            }
                        } catch (Exception e) {
                            Log.e("parseSACKResError:", e.getMessage());
                            AsyncResultHelper.failed("parseSACKResError:" + e.getMessage(), connectionResultListener);
                            e.printStackTrace();
                        }

                    }
            );
        }
    }
}
