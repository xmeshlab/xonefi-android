package com.onefi.XOneFiApp.utils;

import androidx.annotation.NonNull;

import com.onefi.XOneFiApp.entities.Command;

import org.web3j.crypto.Credentials;
import org.web3j.crypto.ECDSASignature;
import org.web3j.crypto.Hash;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigInteger;
import java.util.Arrays;

public class SignUtil {
   public static String getPubAddress (String prk) {
      Credentials credentials = Credentials.create(prk);
      String pubaddress = credentials.getAddress();
      return pubaddress;
   }
   public static String signMessage(String message, String privateKey) {
      byte[] messageToSign = message.getBytes();

      //Create prefix
      String prefix = "\u0019Ethereum Signed Message:\n" + messageToSign.length;

      // Concat prefix and message
      ByteArrayOutputStream outputStream = new ByteArrayOutputStream( );

      try {
         outputStream.write(prefix.getBytes());
         outputStream.write(messageToSign);
      } catch (IOException e) {
         throw new RuntimeException("Error when generating signature", e);
      }

      // Hash the prefixed message
      byte[] hashedPrefixedMessage = Hash.sha3(outputStream.toByteArray());

      // Create credentials (key pair) from mnemonic
      Credentials credentials = Credentials.create(privateKey);;

      //Sign the hashed message with the credentials private key
      Sign.SignatureData signedMessage = Sign.signMessage(
              hashedPrefixedMessage, credentials.getEcKeyPair(), false);


      ECDSASignature sig =
              new ECDSASignature(
                      new BigInteger(1, signedMessage.getR()),
                      new BigInteger(1, signedMessage.getS()));

      int sigV = new BigInteger(signedMessage.getV()).intValue();
      String hexSigR = Numeric.toHexString(signedMessage.getR());
      String hexSigS = Numeric.toHexString(signedMessage.getS());

      String v = Numeric.toHexString(new BigInteger(signedMessage.getV()).toByteArray());
      String r = hexSigR;
      String s = hexSigS;

      String vrs = r + s.substring(2) + v.substring(2);

      return vrs;
   }
   public static Sign.SignatureData signatureData (Command command, Credentials credentials) {
      Sign.SignatureData signatureData = Sign.signMessage(
              JsonUtil.toJson(command).getBytes(),
              credentials.getEcKeyPair(),
              true
      );
      return signatureData;
   }

   @NonNull
   public static String getSignature2(Sign.SignatureData signatureData) {
      String hexSigR = Numeric.toHexString(signatureData.getR());
      String hexSigS = Numeric.toHexString(signatureData.getS());

      String v = Numeric.toHexString(new BigInteger(signatureData.getV()).toByteArray());
      String r = hexSigR;
      String s = hexSigS;
      return r + s.substring(2) + v.substring(2);
   }


   /**
    * TODO 待确认
    * @param signatureData
    * @return
    */
   public static String getSignature (Sign.SignatureData signature) {
      byte[] v1 = signature.getV();
      String v = Numeric.toHexString(Arrays.copyOf(v1, v1.length));
      String r = Numeric.toHexString(signature.getR());
      String s = Numeric.toHexString(signature.getS());

      return r + s + v;
   }

   public static byte[] concatenateSignature(byte v, byte[] r, byte[] s) {
      byte[] signature = new byte[65];
      System.arraycopy(r, 0, signature, 0, 32);
      System.arraycopy(s, 0, signature, 32, 32);
      signature[64] = v;
      return signature;
   }

   public static Sign.SignatureData createSignatureData(byte[] signature) {
      return new Sign.SignatureData(
              signature[64],
              Arrays.copyOfRange(signature, 0, 32),
              Arrays.copyOfRange(signature, 32, 64)
      );
   }
}
