package com.onefi.XOneFiApp.utils;

import android.util.Base64;

import android.util.Log;
import android.util.Base64;
import androidx.annotation.NonNull;

import com.onefi.XOneFiApp.entities.OneFiConfig;
import com.onefi.XOneFiApp.service.wifi.SSIDManager;

import org.bouncycastle.util.encoders.Hex;

import java.math.BigInteger;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class SSIDUtil {
    public static boolean isOnefiSSID(String ssid) {
        if(ssid.length() > 2) {
            if(ssid.charAt(0) == 'O' && ssid.charAt(1) == 'F') {
                String base64_part = ssid.substring(2);
                byte[] decoded_bytes = Base64.decode(base64_part, Base64.DEFAULT);
                String decoded_str = new String(decoded_bytes, StandardCharsets.UTF_8);
                return decoded_str.length() == 42;
            }
        }
        return false;
    }

    public static SSIDManager.ScanResultWithRSISS fastHostSpotSelectionNg2(
            List<SSIDManager.ScanResultWithRSISS> scanResultWithRSISSList,
            OneFiConfig config) {
        SSIDManager.ScanResultWithRSISS fastScanResultWithRSISS = null;
        // This FHS algorithm accounts for restricted hotspots as well.
        // Assume all results are pre-filtered OneFi-compatible hotspots.
        // TODO: Incorporate the gamma-based implementation as above in the paper. Use the Android implementation as a reference.



        // Convert the list of private hotspot identities, stored in the confing, to the list of corresponding prefixes.
        List<String> privateProviderPrefixes = PrivateProviderPrefixes.getPrivateProviderPrefixes(config);
        Log.d("private_prefixes:" , String.valueOf(privateProviderPrefixes));
//        double maxRssi = -5e-324;
        double maxRssi = -5e-324;
        // Look through all OneFi-compatible hotspots (APs).
        int argmaxRssi = -1;
        for (int i = 0; i < scanResultWithRSISSList.size(); i++) {
            SSIDManager.ScanResultWithRSISS resultWithRSISS = scanResultWithRSISSList.get(i);
            if (!resultWithRSISS.getScanResult().SSID.contains("OF")) {
                continue;
            }
            /**
             * {
             *   protocol_version: 0,
             *   hotspot_type: 136,
             *   downlink: 10,
             *   uplink: 9,
             *   ip: '192.168.0.1',
             *   port: 3141,
             *   cost: 0,
             *   pafren: 100,
             *   prefix: ''
             * }
             */
            // Turn Base64-encoded serialized SSID into human-readable JSON.
            DeserializeSSIDResult deserializeSSIDResult = deserializeSSID(resultWithRSISS.getScanResult().SSID);
            // Read the prefix of the provider.
            String prefix = deserializeSSIDResult.getPrefix();
            // Turn number-encoded hotspot type into a human-undestandable JSON.
            // If "restricted" mode is used, only use the APs that client added as "trusted providers".
            HotSpotTypeUtil.HotSpotType dhpt = HotSpotTypeUtil.decodeHotSpotType(deserializeSSIDResult.hotSpotType);
            if (dhpt.getAccessMethod().equals("restricted")) {
                if (privateProviderPrefixes.contains(String.valueOf(prefix))) {
                    continue;
                }
            }

            // Choose the hotspot with highest strength.
            // TODO: Implement the full algorithm.
            fastScanResultWithRSISS = resultWithRSISS;
//            if (resultWithRSISS.getRSISS() > maxRssi) {
//                maxRssi = resultWithRSISS.getRSISS();
//                argmaxRssi = i;
//                fastScanResultWithRSISS = resultWithRSISS;
//            }
        }

        return fastScanResultWithRSISS;

    }

    public static SSIDManager.ScanResultWithRSISS fastHotSpotSelectionNg(List<SSIDManager.ScanResultWithRSISS> scanResultWithRSISSList) {
        double maxRSSI = Double.MIN_VALUE;
        SSIDManager.ScanResultWithRSISS maxRSSIItem = null;
        for (SSIDManager.ScanResultWithRSISS scanResultWithRSISS : scanResultWithRSISSList) {
            if (scanResultWithRSISS.getRSISS() > maxRSSI) {
                maxRSSIItem = scanResultWithRSISS;
            }
        }
        return maxRSSIItem;
    }

//    public static void main(String[] args) {
//        DeserializeSSIDResult deserializeSSIDResult = deserializeSSID("OFAIgKCcCoAAEMRQAAAAAAZA==");
//        System.out.println( deserializeSSIDResult.toString());
//    }

    public static DeserializeSSIDResult deserializeSSID(String ssid) {
        String base64Part = ssid.substring(2,ssid.length());
        String decodedHex = decoded(base64Part);
        String protocolVersionHex = decodedHex.substring(0, 2);
        String hotspotTypeHex = decodedHex.substring(2, 4);
        String downlinkHex = decodedHex.substring(4, 6);
        String uplinkHex = decodedHex.substring(6, 8);
        String ipHex = decodedHex.substring(8, 16);
        String portHex = decodedHex.substring(16, 20);
        String costHex = decodedHex.substring(20, 28);
        String pafrenHex = decodedHex.substring(28, 32);
        String prefixHex = decodedHex.substring(32, 42);

        DeserializeSSIDResult deserializeSSIDResult = new DeserializeSSIDResult();
        deserializeSSIDResult.protocolVersion = Integer.parseInt(protocolVersionHex, 16);
        deserializeSSIDResult.hotSpotType = Integer.parseInt(hotspotTypeHex, 16);
        deserializeSSIDResult.downLink = Integer.parseInt(downlinkHex, 16);
        deserializeSSIDResult.upLink = Integer.parseInt(uplinkHex, 16);
        deserializeSSIDResult.ip = ipNumberToQuartet(Integer.parseInt(ipHex, 16));
        deserializeSSIDResult.port = Integer.parseInt(portHex, 16);
        deserializeSSIDResult.cost = Integer.parseInt(costHex, 16);
        deserializeSSIDResult.pafren = Integer.parseInt(pafrenHex, 16);
        deserializeSSIDResult.prefix = prefixHex;
        deserializeSSIDResult.ssid = ssid;



        return deserializeSSIDResult;
    }

    @NonNull
    private static String decoded(String base64Part) {
//        byte[] decodedBytes = Base64.decode(base64Part, Base64.DEFAULT);
//        ByteBuffer byteBuffer = ByteBuffer.wrap(decodedBytes);
//        CharBuffer charBuffer = StandardCharsets.ISO_8859_1.decode(byteBuffer);
//        byte[] bytes = new String(charBuffer.array()).getBytes(StandardCharsets.UTF_8);
//        String decodedHex = new BigInteger(1, bytes).toString(16);
//        return decodedHex;

        byte[] decoded = Base64.decode(base64Part, Base64.DEFAULT);
        String hex = new String(Hex.encode(decoded), StandardCharsets.UTF_8);
        return hex;
    }

    /**
     * Convert IPv4 address encoded in a number into the canonical A.B.C.D format
     * @param {int} ip_number - number representing the IP address
     * @returns {string} IPv4 address in the canonical A.B.C.D format.
     */
    public static String ipNumberToQuartet(int ipNumber) {
        int n1 = ipNumber / 16777216;
        ipNumber = ipNumber - 16777216 * n1;

        int n2 = ipNumber / 65536;
        ipNumber = ipNumber - 65536 * n2;

        int n3 = ipNumber / 256;
        int n4 = ipNumber - 256 * n3;

        return String.format("%d.%d.%d.%d", n1, n2, n3, n4);
    }

    public static class DeserializeSSIDResult {
        private String ssid;
        private String prefix;
        private int pafren;
        private int cost;
        private int port;
        private String ip;
        private int upLink;
        private int downLink;
        private int protocolVersion;

        private int hotSpotType;

        public int getProtocolVersion() {
            return protocolVersion;
        }

        public int getHotSpotType() {
            return hotSpotType;
        }

        public int getDownLink() {
            return downLink;
        }

        public int getUpLink() {
            return upLink;
        }

        public String getIp() {
            return ip;
        }

        public int getPort() {
            return port;
        }

        public int getCost() {
            return cost;
        }

        public String getPrefix() {
            return prefix;
        }

        public int getPafren() {
            return pafren;
        }

        public String getSsid() {
            return ssid;
        }

        public void setSsid(String ssid) {
            this.ssid = ssid;
        }

    }

}
