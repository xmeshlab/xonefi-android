package com.onefi.XOneFiApp.entities;

import com.google.gson.annotations.SerializedName;

public class Account{

	@SerializedName("address")
	private String address;

	@SerializedName("name")
	private String name;

	@SerializedName("encrypted_prk")
	private String encryptedPrk;

	public void setAddress(String address){
		this.address = address;
	}

	public String getAddress(){
		return address;
	}

	public void setName(String name){
		this.name = name;
	}

	public String getName(){
		return name;
	}

	public void setEncryptedPrk(String encryptedPrk){
		this.encryptedPrk = encryptedPrk;
	}

	public String getEncryptedPrk(){
		return encryptedPrk;
	}
}