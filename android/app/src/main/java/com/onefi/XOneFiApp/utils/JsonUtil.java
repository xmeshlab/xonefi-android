package com.onefi.XOneFiApp.utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.math.BigDecimal;

public class JsonUtil {
   public static class BigDecimalSerializer implements JsonSerializer<BigDecimal> {
      @Override
      public JsonElement serialize(BigDecimal bigDecimal, Type type, JsonSerializationContext jsonSerializationContext) {
         if(bigDecimal == null){
            return null;
         }else{
            return new JsonPrimitive(bigDecimal.stripTrailingZeros().toPlainString());
         }
      }
   }
   public static String toJson(Object obj) {
      Gson gson = new GsonBuilder()

              .serializeNulls()

//              .setDateFormat("yyyy-MM-dd")

//              .registerTypeAdapter(BigDecimal.class, new BigDecimalSerializer())

              .create();
      return gson.toJson(obj);
   }

   public static  <T> T fromJson(String json, Class<T> cls) {
      Gson gson = new Gson();
      T t = gson.fromJson(json, cls);
      return t;
   }
   public static <T> T fromJson(String json, TypeToken<T> tTypeToken) {
      Gson gson = new Gson();
      T t = gson.fromJson(json, tTypeToken);
      return t;
   }
}
