package com.onefi.XOneFiApp.storage;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteStatement;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.ReactConstants;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.reactnativecommunity.asyncstorage.AsyncLocalStorageUtil;
import com.reactnativecommunity.asyncstorage.AsyncStorageErrorUtil;
import com.reactnativecommunity.asyncstorage.ReactDatabaseSupplier;
import com.onefi.XOneFiApp.entities.OneFiConfig;
import com.onefi.XOneFiApp.utils.JsonUtil;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.annotation.Nullable;

public class OneFiStorage {
   private static volatile OneFiStorage instance;
   static final String TABLE_CATALYST = "catalystLocalStorage";
   static final String KEY_COLUMN = "key";
   static final String VALUE_COLUMN = "value";
   private final ReactDatabaseSupplier mReactDatabaseSupplier;
   private boolean mShuttingDown = false;
   private Context context;
   private SQLiteDatabase database;
   private JsonObject originJsonObject;
   private static final int MAX_SQL_KEYS = 999;

//   private final String originData = "{\"version\":\"0.2\",\"account_set\":false,\"client_on\":false,\"ap_on\":false,\"pft\":false,\"pfd\":false,\"cft\":false,\"cfd\":false,\"private_client\":false,\"private_provider\":false,\"max_ofi_mb\":0,\"max_ofi_hr\":0,\"price_ofi_mb\":0,\"price_ofi_hr\":0,\"infura_api_key\":\"\",\"network\":\"ropsten\",\"account\":{\"name\":\"\",\"encrypted_prk\":\"\",\"address\":\"\"},\"private_providers\":[],\"private_clients\":[],\"provider_ip\":\"192.168.0.1\",\"port\":3141,\"wlan_interface\":\"[none]\",\"ssids\":[],\"pafren_percentage\":100,\"min_downlink_tier\":10,\"min_uplink_tier\":9,\"client_max_pafren\":200,\"gas_offer\":{\"mainnet\":\"121000000000\",\"ropsten\":\"7000000\",\"kovan\":\"2000000\"},\"gas_price\":{\"mainnet\":\"121000000000\",\"ropsten\":\"7300000000\",\"kovan\":\"2000000\"},\"call_confirmation_threshold\":2,\"handshake_time\":300,\"sack_period\":70,\"minimum_pafren_length\":3540,\"expected_sack_amount\":131,\"expected_pafren_amount\":7900,\"allow_handover\":false,\"e2e_mode\":false,\"client_session\":{\"status\":0,\"ssid\":\"\",\"ip\":\"\",\"port\":0,\"prefix\":\"\",\"pfd\":false,\"pft\":false,\"free\":false,\"restricted\":false,\"sack_number\":0,\"expiration_timestamp\":0,\"pafren_timestamp\":0,\"session_id\":\"\",\"number_of_sacks\":0,\"pafren_amount\":0,\"sack_amount\":0,\"pafren_percentage\":0,\"cost\":0,\"scan_counter\":0,\"last_sack_timestamp\":0,\"provider_address\":\"\",\"initiated_sack_number\":0,\"sackok\":{}}}";
   private final String originData = "{\"version\":\"0.2\",\"account_set\":false,\"client_on\":false,\"ap_on\":false,\"pft\":false,\"pfd\":false,\"cft\":false,\"cfd\":false,\"private_client\":false,\"private_provider\":false,\"max_ofi_mb\":0,\"max_ofi_hr\":0,\"price_ofi_mb\":0,\"price_ofi_hr\":0,\"infura_api_key\":\"\",\"network\":\"ropsten\",\"account\":{\"name\":\"\",\"encrypted_prk\":\"97olL5BviXrG9gAqgZFUy/viASovAs/SJTWQ7I66gPrGafgYHt3sHcvJpx6w2ldweEHEiaWZmD3sk7dvtr5e9tAS\",\"address\":\"0x0221B57Cc38C0360f1CAf638e1671243870C0424\"},\"private_providers\":[],\"private_clients\":[],\"provider_ip\":\"192.168.0.1\",\"port\":3141,\"wlan_interface\":\"[none]\",\"ssids\":[],\"pafren_percentage\":100,\"min_downlink_tier\":10,\"min_uplink_tier\":9,\"client_max_pafren\":200,\"gas_offer\":{\"mainnet\":\"121000000000\",\"ropsten\":\"7000000\",\"kovan\":\"2000000\"},\"gas_price\":{\"mainnet\":\"121000000000\",\"ropsten\":\"7300000000\",\"kovan\":\"2000000\"},\"call_confirmation_threshold\":2,\"handshake_time\":300,\"sack_period\":70,\"minimum_pafren_length\":3540,\"expected_sack_amount\":131,\"expected_pafren_amount\":7900,\"allow_handover\":false,\"e2e_mode\":false,\"client_session\":{\"status\":0,\"ssid\":\"\",\"ip\":\"\",\"port\":0,\"prefix\":\"\",\"pfd\":false,\"pft\":false,\"free\":false,\"restricted\":false,\"sack_number\":0,\"expiration_timestamp\":0,\"pafren_timestamp\":0,\"session_id\":\"\",\"number_of_sacks\":0,\"pafren_amount\":0,\"sack_amount\":0,\"pafren_percentage\":0,\"cost\":0,\"scan_counter\":0,\"last_sack_timestamp\":0,\"provider_address\":\"\",\"initiated_sack_number\":0,\"sackok\":{}}}";

   public static synchronized OneFiStorage getInstance(Context ctx) {
      if (instance == null) {
         synchronized (OneFiStorage.class) {
            if (instance == null) {
               instance = new OneFiStorage(ctx);
            }
         }
      }
      return instance;
   }

   private OneFiStorage (Context ctx) {
      context = ctx;
      mReactDatabaseSupplier = ReactDatabaseSupplier.getInstance(ctx);
   }
   public void configIfAbsent () throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
      if (isEmpty()) {
         init();
      }

   }
   public boolean isEmpty () {
      String client_session = getItem("client_session");
      return client_session == null;
   }
   public void init () throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
      if (originJsonObject == null) {
         originJsonObject = (JsonObject) JsonParser.parseString(originData);
      }
      Set<Map.Entry<String, JsonElement>> entries = originJsonObject.entrySet();
      multiSetJsonElements(entries);

   }



   public void setItem(String key, Object value) {
      String s = JsonUtil.toJson(value);
      setItem(key, s);
   }

   public void setItem (String key, String value) {

      HashMap<String, String> keyValues = new HashMap<>();
      keyValues.put(key, value);
      try {
         multiSetStrings(keyValues.entrySet());
      } catch (Exception e) {
         e.printStackTrace();
      }
   }
   public String getItem (String key) {
      try {
         ArrayList<String> keys = new ArrayList<>();
         keys.add(key);
         ArrayList<WritableArray> list =  multiGet(keys);
         if (list.size() > 0) {
            return list.get(0).getString(1);
         }
      } catch (Exception e) {
         e.printStackTrace();
      }
      return null;
   }
   public ArrayList<WritableArray> multiGet(ArrayList<String> getKeys) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
      ReadableArray keys = Arguments.fromList(getKeys);
      ArrayList<WritableArray> data = new ArrayList<>();
      if (!ensureDatabase()) {
         return data;
      }
      String[] columns = {"key", "value"};
      HashSet<String> keysRemaining = new HashSet<>();
      for (int keyStart = 0; keyStart < keys.size(); keyStart += MAX_SQL_KEYS) {
         int keyCount = Math.min(keys.size() - keyStart, MAX_SQL_KEYS);
         Cursor cursor = mReactDatabaseSupplier.get().query(
                 TABLE_CATALYST,
                 columns,
                 buildKeySelection(keyCount),
                 buildKeySelectionArgs(keys, keyStart, keyCount),
                 null,
                 null,
                 null);
         keysRemaining.clear();
         try {
            if (cursor.getCount() != keys.size()) {
               // some keys have not been found - insert them with null into the final array
               for (int keyIndex = keyStart; keyIndex < keyStart + keyCount; keyIndex++) {
                  keysRemaining.add(keys.getString(keyIndex));
               }
            }

            if (cursor.moveToFirst()) {
               do {
                  WritableArray row = Arguments.createArray();
                  row.pushString(cursor.getString(0));
                  row.pushString(cursor.getString(1));
                  data.add(row);
                  keysRemaining.remove(cursor.getString(0));
               } while (cursor.moveToNext());
            }
         } catch (Exception e) {
            Log.w(ReactConstants.TAG, e.getMessage(), e);
            getError(null, e.getMessage());
            return data;
         } finally {
            cursor.close();
         }

         for (String key : keysRemaining) {
            WritableArray row = Arguments.createArray();
            row.pushString(key);
            row.pushNull();
            data.add(row);
         }
         keysRemaining.clear();
      }
      return data;
   }
   public void multiSetStrings(final Set<Map.Entry<String, String>> sets) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
      if (!ensureDatabase()) {
         return;
      }
      String sql = "INSERT OR REPLACE INTO catalystLocalStorage" + " VALUES (?, ?);";
      SQLiteStatement statement = mReactDatabaseSupplier.get().compileStatement(sql);
      WritableMap error = null;
      try {
         mReactDatabaseSupplier.get().beginTransaction();
         for (Map.Entry<String, String> entry : sets) {
            String key = entry.getKey();
            String value = entry.getValue();
            if (key == null) {
               error = getInvalidValueError(null);
               return;
            }
            if (value == null) {
               error = getInvalidValueError(null);
               return;
            }
            statement.clearBindings();
            statement.bindString(1, key);
            statement.bindString(2, value);
            statement.execute();
         }
         mReactDatabaseSupplier.get().setTransactionSuccessful();
      }catch (Exception e) {
         Log.w(ReactConstants.TAG, e.getMessage(), e);
         error = getError(null, e.getMessage());
      } finally {
         try {
            mReactDatabaseSupplier.get().endTransaction();
         } catch (Exception e) {
            Log.w(ReactConstants.TAG, e.getMessage(), e);
            if (error == null) {
               error = getError(null, e.getMessage());
            }
         }
      }
   }

   public void multiSetJsonElements(Set<Map.Entry<String, JsonElement>> entries) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
      HashMap<String, String> map = new HashMap<>();
      HashSet<Map.Entry<String, String>> sets = new HashSet<>();
      for (Map.Entry<String, JsonElement> entry : entries) {
         JsonElement value = entry.getValue();
         map.put(entry.getKey(), JsonUtil.toJson(value));
      }
      Set<Map.Entry<String, String>> jsonSets = map.entrySet();
      multiSetStrings(jsonSets);
   }

//   public String getItem(String key){
//      return
//              AsyncLocalStorageUtil.getItemImpl(database, key);
//   }

//   public String getItem(String key){
//      return
//              AsyncLocalStorageUtil.getItemImpl(database, key);
//   }


   public OneFiConfig getConfig () {
      if (originJsonObject == null) {
         originJsonObject = (JsonObject) JsonParser.parseString(originData);
      }
      Set<String> keySet = originJsonObject.keySet();
      JsonObject totalJsonObject = new JsonObject();
      for (String key : keySet) {
         String innerJson = getItem(key);
         JsonElement innerJsonElement = JsonUtil.fromJson(innerJson, JsonElement.class);
         totalJsonObject.add(key, innerJsonElement);
      }
      Gson gson = new Gson();
      return gson.fromJson(totalJsonObject, OneFiConfig.class);
   }

   /**
    * Verify the database is open for reads and writes.
    */
   private boolean ensureDatabase() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
      Method method = ReactDatabaseSupplier.class.getDeclaredMethod("ensureDatabase");
      method.setAccessible(true);
      boolean invoke = (boolean)method.invoke(mReactDatabaseSupplier);
      return !mShuttingDown && invoke;
   }

   private WritableMap getInvalidValueError(@Nullable String key) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
      Class<AsyncStorageErrorUtil> clazz = AsyncStorageErrorUtil.class;
//      clazz.
      Method method = clazz.getDeclaredMethod("getInvalidValueError", String.class);
      method.setAccessible(true);
      WritableMap result = (WritableMap) method.invoke(null, key);
      return result;
   }

   private WritableMap getInvalidKeyError(@Nullable String key) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
      Class<AsyncStorageErrorUtil> clazz = AsyncStorageErrorUtil.class;
      Method method = clazz.getDeclaredMethod("getInvalidKeyError", String.class);
      method.setAccessible(true);
      WritableMap result = (WritableMap) method.invoke(null, key);
      return result;
   }

   private WritableMap getError(@Nullable String key, String errorMessage) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
      Class<AsyncStorageErrorUtil> clazz = AsyncStorageErrorUtil.class;
      Method method = clazz.getDeclaredMethod("getError", String.class);
      method.setAccessible(true);
      WritableMap result = (WritableMap) method.invoke(null, key, errorMessage);
      return result;
   }

   private String buildKeySelection (int keyCount) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
      Class<AsyncLocalStorageUtil> clazz = AsyncLocalStorageUtil.class;
      Method method = clazz.getDeclaredMethod("buildKeySelection", int.class);
      method.setAccessible(true);
      String result = (String) method.invoke(null, keyCount);
      return result;

   }

   private String[] buildKeySelectionArgs (ReadableArray keys, int start, int count) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
      Class<AsyncLocalStorageUtil> clazz = AsyncLocalStorageUtil.class;
      Method method = clazz.getDeclaredMethod("buildKeySelectionArgs", ReadableArray.class,int.class, int.class);
      method.setAccessible(true);
      String[] result = (String[]) method.invoke(null, keys, start, count);
      return result;
   }
}
