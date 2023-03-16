package com.onefi.XOneFiApp.utils;
import android.os.Build;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.Base64;
public class Crypto {
    /**
     * Encrypt string with a given password using AES-256 with CTR mode. Used to encrypt the private key in OneFi.
     * @param data - string to be encrypted
     * @param password - password used for symmetric encryption (and decryption)
     * @returns - Base64-encoded cipher.
     */
    public static String encrypt(String data, String password) throws Exception {
        byte[] key = MessageDigest.getInstance("SHA-256").digest(password.getBytes(StandardCharsets.UTF_8));
        key = Arrays.copyOf(key, 16);
        SecretKeySpec secretKeySpec = new SecretKeySpec(key, "AES");
        Cipher cipher = Cipher.getInstance("AES/CTR/NoPadding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, new IvParameterSpec("00000000000onefi".getBytes(StandardCharsets.UTF_8)));
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            return Base64.getEncoder().encodeToString(cipher.doFinal(data.getBytes(StandardCharsets.UTF_8)));
        }
        return null;
    }

    /**
     * Decrypt Base64-encoded cipher with the given password.
     * @param base64Cipher - cipher produced by encrypt_aes256ctr_base64()
     * @param password - password for decryption
     */
    public static String decrypt(String base64Cipher, String password) throws Exception {
        byte[] key = MessageDigest.getInstance("SHA-256").digest(password.getBytes(StandardCharsets.UTF_8));
        SecretKeySpec secretKeySpec = new SecretKeySpec(key, "AES");
        Cipher cipher = Cipher.getInstance("AES/CTR/NoPadding");
        cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, new IvParameterSpec("00000000000onefi".getBytes(StandardCharsets.UTF_8)));
        byte[] buffer = cipher.doFinal(Base64.getDecoder().decode(base64Cipher));
        return new String(buffer);
    }

//    public static void main(String[] args) throws Exception {
//        String decrypt = decrypt("decrypt", "seitlab123!@");
//
//
//        System.out.println("decrypt :"+decrypt);
//    }

}
