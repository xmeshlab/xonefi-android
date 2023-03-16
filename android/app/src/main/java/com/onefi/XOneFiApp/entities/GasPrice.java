package com.onefi.XOneFiApp.entities;

import com.google.gson.annotations.SerializedName;

public class GasPrice{

	@SerializedName("kovan")
	private String kovan;

	@SerializedName("mainnet")
	private String mainnet;

	@SerializedName("ropsten")
	private String ropsten;

	public void setKovan(String kovan){
		this.kovan = kovan;
	}

	public String getKovan(){
		return kovan;
	}

	public void setMainnet(String mainnet){
		this.mainnet = mainnet;
	}

	public String getMainnet(){
		return mainnet;
	}

	public void setRopsten(String ropsten){
		this.ropsten = ropsten;
	}

	public String getRopsten(){
		return ropsten;
	}
}