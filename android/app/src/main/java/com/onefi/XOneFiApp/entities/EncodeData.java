package com.onefi.XOneFiApp.entities;

import java.math.BigDecimal;

public class EncodeData {
   private String client;
   private String hotspot;
   private long currentAmount;
   private long currentTimeStamp;
   private String prk;

   public String getClient() {
      return client;
   }

   public void setClient(String client) {
      this.client = client;
   }

   public String getHotspot() {
      return hotspot;
   }

   public void setHotspot(String hotspot) {
      this.hotspot = hotspot;
   }

   public long getCurrentAmount() {
      return currentAmount;
   }

   public void setCurrentAmount(long currentAmount) {
      this.currentAmount = currentAmount;
   }

   public long getCurrentTimeStamp() {
      return currentTimeStamp;
   }

   public void setCurrentTimeStamp(long currentTimeStamp) {
      this.currentTimeStamp = currentTimeStamp;
   }

   public String getPrk() {
      return prk;
   }

   public void setPrk(String prk) {
      this.prk = prk;
   }
}
