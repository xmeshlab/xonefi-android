package com.onefi.XOneFiApp.api;

import android.content.Context;

import com.onefi.XOneFiApp.utils.JsonUtil;
import com.onefi.XOneFiApp.utils.SSIDUtil;
import com.onefi.XOneFiApp.service.wifi.SSIDManager;

import java.util.ArrayList;
import java.util.List;

public class SSIDApi extends Api {

    public SSIDApi(Context ctx) {
        super(ctx);
    }
    public void saveSSIDs (List<String> list) {
        storage.setItem("ssids", JsonUtil.toJson(list));
    }
    public static List<SSIDManager.ScanResultWithRSISS> filterOneFiNetWorks (List<SSIDManager.ScanResultWithRSISS> scanResultList) {
        List<SSIDManager.ScanResultWithRSISS> scanResultWithRSISSList = new ArrayList<>();
        for (SSIDManager.ScanResultWithRSISS scanResult : scanResultList) {
            String ssid = scanResult.getScanResult().SSID;
            if (SSIDUtil.isOnefiSSID(ssid)) {
                scanResultWithRSISSList.add(scanResult);
            }
        }
        return scanResultWithRSISSList;
    }


}