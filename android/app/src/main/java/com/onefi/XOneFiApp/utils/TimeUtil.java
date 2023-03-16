package com.onefi.XOneFiApp.utils;

public class TimeUtil {

    public static long getCurrentTimeStamp () {
        return (long) Math.floor(System.currentTimeMillis() / 1000);
    }
}
