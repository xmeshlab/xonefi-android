package com.onefi.XOneFiApp.utils;

import com.onefi.XOneFiApp.entities.OneFiConfig;

import java.util.ArrayList;
import java.util.List;

public class PrivateProviderPrefixes {
    public static List<String> getPrivateProviderPrefixes (OneFiConfig config) {
        ArrayList<String> prefixes = new ArrayList<>();
        for (String privateProvider : config.getPrivateProviders()) {
            prefixes.add(privateProvider.substring(2, 12));
        }

        return prefixes;
    }
}
