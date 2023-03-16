package com.onefi.XOneFiApp.utils;

public class HotSpotTypeUtil {
    public static HotSpotType decodeHotSpotType (int type) {
        StringBuilder hts = new StringBuilder(Integer.toBinaryString(type));
        while (hts.length() < 8) {
            hts.insert(0, "0");
        }

        int f1 = Integer.parseInt(hts.substring(0, 1), 2);
        int f2 = Integer.parseInt(hts.substring(1, 3), 2);
        int f3 = Integer.parseInt(hts.substring(3, 5), 2);
        int f4 = Integer.parseInt(hts.substring(5, 8), 2);

        boolean actualStatus = false;
        String actualAccessMethod = "";
        String actualBlockchainNetwork = "";
        int actualReservedField = f4;
        actualStatus = f1 == 1;

        if (f2 == 0) {
            actualAccessMethod = "free";
        } else if (f2 == 1) {
            actualAccessMethod = "pft";
        } else if (f2 == 2) {
            actualAccessMethod = "pfd";
        } else {
            actualAccessMethod = "restricted";
        }

        if (f3 == 0) {
            actualBlockchainNetwork = "mainnet";
        } else if (f3 == 1) {
            actualBlockchainNetwork = "goerli";
        } else if (f3 == 2) {
            actualBlockchainNetwork = "kovan";
        } else {
            actualBlockchainNetwork = "reserved";
        }

        HotSpotType hotSpotType = new HotSpotType();
        hotSpotType.status = actualStatus;
        hotSpotType.accessMethod = actualAccessMethod;
        hotSpotType.blockchainNetwork = actualBlockchainNetwork;
        hotSpotType.reservedField = actualReservedField;

        return hotSpotType;

    }


    public static class HotSpotAmount {
        public double getCalculatedSackAmount() {
            return calculatedSackAmount;
        }

        public double getCalculatedPafrenAmount() {
            return calculatedPafrenAmount;
        }

        public double getCalculatedNumberOfSacks() {
            return calculatedNumberOfSacks;
        }

        public double getPafrenLength() {
            return pafrenLength;
        }

        private double calculatedSackAmount = 0;
        private long calculatedPafrenAmount = 0;
        private double calculatedNumberOfSacks = 0;
        private double pafrenLength = 0;

    }

    public static HotSpotAmount getAmount (String method, SSIDUtil.DeserializeSSIDResult deserializeSSIDResult) {
        HotSpotAmount hotSpotAmount = new HotSpotAmount();
        int cost = deserializeSSIDResult.getCost();
        if ("pft".equals(method)) {
            hotSpotAmount.calculatedSackAmount = cost / 60.0;
            hotSpotAmount.calculatedPafrenAmount = (long) (cost * deserializeSSIDResult.getPafren() * 0.01 * 60);
            hotSpotAmount.calculatedNumberOfSacks = hotSpotAmount.calculatedPafrenAmount / (hotSpotAmount.calculatedSackAmount * 60);
            hotSpotAmount.pafrenLength = hotSpotAmount.calculatedNumberOfSacks * 60;
        } else if ("pfd".equals(method)) {
            hotSpotAmount.calculatedSackAmount = Integer.valueOf(cost).doubleValue() / 64;
            hotSpotAmount.calculatedPafrenAmount = (long) (cost * deserializeSSIDResult.getPafren() * 0.01 * 64);
            hotSpotAmount.calculatedNumberOfSacks = hotSpotAmount.calculatedPafrenAmount / (hotSpotAmount.calculatedSackAmount * 64);
            hotSpotAmount.pafrenLength =  3600 * 24; // User has 24 hours to spend 1 GB. TODO: Change in future protocols.

        } else if ("restricted".equals(method) || "free".equals(method)) {
            hotSpotAmount.calculatedSackAmount = 0;
            hotSpotAmount.calculatedPafrenAmount = 0;
            hotSpotAmount.calculatedNumberOfSacks = 0;
            hotSpotAmount.pafrenLength = 0;
        } else {
            return null;
        }
        return hotSpotAmount;
    }

    public static class HotSpotType {

        private String accessMethod;
        private String blockchainNetwork;
        private int reservedField;
        private boolean status;

        public String getAccessMethod() {
            return accessMethod;
        }

        public String getBlockchainNetwork() {
            return blockchainNetwork;
        }


        public int getReservedField() {
            return reservedField;
        }

        public void setReservedField(int reservedField) {
            this.reservedField = reservedField;
        }

        public boolean isStatus() {
            return status;
        }
    }

    public static class HotSpotInfo {
        private boolean restrictedAccessAllowed;
        private boolean freeHotspot;
        private boolean activePaidSession;
        private boolean paidUnlimitedData;
        private boolean paidPerData;
        private boolean freqMatchMobilitySettings;
        private int channelAvailability;
        private boolean starredHotspot;
        private int paidHotspotCost;
        private int downlinkBandwidth;
        private int uplinkBandwidth;
        private int prePayment;
        private int signalStrength;

        public boolean isRestrictedAccessAllowed() {
            return restrictedAccessAllowed;
        }

        public boolean isFreeHotspot() {
            return freeHotspot;
        }

        public boolean isActivePaidSession() {
            return activePaidSession;
        }

        public boolean isPaidUnlimitedData() {
            return paidUnlimitedData;
        }

        public boolean isPaidPerData() {
            return paidPerData;
        }

        public boolean isFreqMatchMobilitySettings() {
            return freqMatchMobilitySettings;
        }

        public int getChannelAvailability() {
            return channelAvailability;
        }

        public boolean isStarredHotspot() {
            return starredHotspot;
        }

        public int getPaidHotspotCost() {
            return paidHotspotCost;
        }

        public int getDownlinkBandwidth() {
            return downlinkBandwidth;
        }

        public int getUplinkBandwidth() {
            return uplinkBandwidth;
        }

        public int getPrePayment() {
            return prePayment;
        }

        public int getSignalStrength() {
            return signalStrength;
        }

        public void setRestrictedAccessAllowed(boolean restrictedAccessAllowed) {
            this.restrictedAccessAllowed = restrictedAccessAllowed;
        }

        public void setFreeHotspot(boolean freeHotspot) {
            this.freeHotspot = freeHotspot;
        }

        public void setActivePaidSession(boolean activePaidSession) {
            this.activePaidSession = activePaidSession;
        }

        public void setPaidUnlimitedData(boolean paidUnlimitedData) {
            this.paidUnlimitedData = paidUnlimitedData;
        }

        public void setPaidPerData(boolean paidPerData) {
            this.paidPerData = paidPerData;
        }

        public void setFreqMatchMobilitySettings(boolean freqMatchMobilitySettings) {
            this.freqMatchMobilitySettings = freqMatchMobilitySettings;
        }

        public void setChannelAvailability(int channelAvailability) {
            this.channelAvailability = channelAvailability;
        }

        public void setStarredHotspot(boolean starredHotspot) {
            this.starredHotspot = starredHotspot;
        }

        public void setPaidHotspotCost(int paidHotspotCost) {
            this.paidHotspotCost = paidHotspotCost;
        }

        public void setDownlinkBandwidth(int downlinkBandwidth) {
            this.downlinkBandwidth = downlinkBandwidth;
        }

        public void setUplinkBandwidth(int uplinkBandwidth) {
            this.uplinkBandwidth = uplinkBandwidth;
        }

        public void setPrePayment(int prePayment) {
            this.prePayment = prePayment;
        }

        public void setSignalStrength(int signalStrength) {
            this.signalStrength = signalStrength;
        }
    }
}
