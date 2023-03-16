package com.onefi.XOneFiApp.api;

import android.content.Context;

import com.onefi.XOneFiApp.entities.ClientSession;

import java.lang.reflect.InvocationTargetException;

public class SACKNumberApi extends Api {
   private ClientSessionApi clientSessionApi;
   public SACKNumberApi(Context ctx) {
      super(ctx);
      clientSessionApi = new ClientSessionApi(context);

   }
   /**
    * Retrieve the serial number of the SACK, which is in the process of sending, but has not sent yet to the provider.
    * This number prevents re-entrancy in the SACK workflow.
    * @returns {int} The number of the SACK that is in the process of sending.
    */
   public int getInitiatedSACKNumber() {
      return clientSessionApi.getData().getInitiatedSackNumber();
   }

   /**
    * Save in the client session state the serial number of the SACK that is initiated, but not yet sent-and-processed
    * by the provider.
    * @param number - Serial number of the initiated SACK
    * @returns {boolean} true: success; false: failure.
    */
   public void setInitiatedSACKNumber(int number) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
      ClientSession data = clientSessionApi.getData();
      data.setInitiatedSackNumber(number);
      clientSessionApi.setClientSession(data);
   }

   /**
    * Retrieve the most recent SACK (satisfaction acknowledgement) number from the client session state.
    * @returns {int} Most recent SACK number.
    */
   public int getSACKNumber() {
      ClientSession data = clientSessionApi.getData();
      return data.getSackNumber();
   }

   /**
    * Save in the client session state the most recent SACK number.
    * @param {int} number - the serial number of the most recent SACK
    * @returns {boolean} true: success; false: failure.
    */
   public void setSACKNumber(int number) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
      ClientSession data = clientSessionApi.getData();
      data.setSackNumber(number);
      clientSessionApi.setClientSession(data);
   }
}
