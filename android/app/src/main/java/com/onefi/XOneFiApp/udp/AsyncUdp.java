package com.onefi.XOneFiApp.udp;

import android.os.AsyncTask;

import com.onefi.XOneFiApp.service.wifi.ClientWorker;

import java.lang.reflect.InvocationTargetException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.Arrays;

public class AsyncUdp extends AsyncTask<String, Integer, Object> {
   private DatagramSocket socket;
   private Object result;
   private ClientWorker.Callback callback;
   private ClientWorker.Callback errorCallback;
   private boolean hasError = false;
   private int timeout = 30000;
   @Override
   protected Object doInBackground(String... params) {
      try {
         String ip = params[0];
         int port  = Integer.parseInt(params[1]);
         byte[] buffer = params[2].getBytes();
         socket = new DatagramSocket();
         InetAddress inetAddress = InetAddress.getByName(ip);
         DatagramPacket packet =
                 new DatagramPacket(buffer, buffer.length, inetAddress, port);
         socket.send(packet);
         // Receive the packet
         byte[] receiveBuffer = new byte[1024];
         DatagramPacket receivePacket = new DatagramPacket(receiveBuffer,receiveBuffer.length);
         socket.setSoTimeout(this.timeout);
         // Get the data from the packet
         socket.receive(receivePacket);
         result = Arrays.copyOfRange(receivePacket.getData(), receivePacket.getOffset(), receivePacket.getLength());
         socket.close();
      } catch (Exception e) {
         this.hasError = true;
         if (this.socket != null) {
            socket.close();
         }
         if (this.errorCallback != null) {
            try {
               this.errorCallback.callback(e);
            } catch (Exception ex) {
               ex.printStackTrace();
            }
         }
         e.printStackTrace();
      }
      return result;
   }

   public void send(String ip, String port, String message, ClientWorker.Callback listener) {
      execute(ip,port,message);
      this.callback = listener;
   }
   public void send(String ip, String port, String message, ClientWorker.Callback listener, ClientWorker.Callback errorCallback) {
      execute(ip,port,message);
      this.callback = listener;
      this.errorCallback = errorCallback;
   }
   @Override
   protected void onPostExecute(Object o) {
      if (this.callback != null && !this.hasError) {
         try {
            this.callback.callback(o);
         } catch (InvocationTargetException | NoSuchMethodException | IllegalAccessException e) {
            e.printStackTrace();
         }
      }
      super.onPostExecute(o);
   }

   public AsyncUdp setTimeout(int timeout) {
      this.timeout = timeout;
      return this;
   }
}
