package com.onefi.XOneFiApp.service.wifi;

import android.content.Context;
import android.net.wifi.ScanResult;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.thanosfisherman.wifiutils.WifiUtils;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

public class SSIDManager {
    private Context context;
    public static class ScanResultWithRSISS  {
        private double RSISS;
        private ScanResult scanResult;
        public double getRSISS() {
            return RSISS;
        }

        public void setRSISS(double RSISS) {
            this.RSISS = RSISS;
        }

        public ScanResult getScanResult() {
            return scanResult;
        }

        public void setScanResult(ScanResult scanResult) {
            this.scanResult = scanResult;
        }
    }

    public void scan (@Nullable ScanResultWithRSSISListener scanResultsListener) {
        WifiUtils.withContext(context).scanWifi(scanResults -> {
            List<ScanResultWithRSISS> scanResultWithRSISSList = new ArrayList<>();
            for (ScanResult scanResult : scanResults) {
                ScanResultWithRSISS scanResultWithRSISS = new ScanResultWithRSISS();
                scanResultWithRSISS.RSISS = 2.55 * 2 * scanResult.level * 100;
                scanResultWithRSISS.setScanResult(scanResult);
                scanResultWithRSISSList.add(scanResultWithRSISS);
            }
            assert scanResultsListener != null;
            try {
                scanResultsListener.onScanResults(scanResultWithRSISSList);
            } catch (InvocationTargetException | NoSuchMethodException | IllegalAccessException e) {
                e.printStackTrace();
            }
        }).start();
    }

    public SSIDManager(Context context) {
        this.context = context;
    }

    public interface ScanResultWithRSSISListener {
        void onScanResults(@NonNull List<ScanResultWithRSISS> scanResults) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException;
    }

}
