package com.onefi.XOneFiApp.entities;

import java.util.List;
import com.google.gson.annotations.SerializedName;

public class OneFiConfig{

	@SerializedName("min_downlink_tier")
	private int minDownlinkTier;

	@SerializedName("price_ofi_hr")
	private int priceOfiHr;

	@SerializedName("infura_api_key")
	private String infuraApiKey;

	@SerializedName("network")
	private String network;

	@SerializedName("client_on")
	private boolean clientOn;

	@SerializedName("ssids")
	private List<String> ssids;

	@SerializedName("sack_period")
	private int sackPeriod;

	@SerializedName("minimum_pafren_length")
	private int minimumPafrenLength;

	@SerializedName("max_ofi_mb")
	private int maxOfiMb;

	@SerializedName("wlan_interface")
	private String wlanInterface;

	@SerializedName("gas_offer")
	private GasOffer gasOffer;

	@SerializedName("handshake_time")
	private int handshakeTime;

	@SerializedName("max_ofi_hr")
	private int maxOfiHr;

	@SerializedName("private_providers")
	private List<String> privateProviders;

	@SerializedName("expected_pafren_amount")
	private int expectedPafrenAmount;

	@SerializedName("call_confirmation_threshold")
	private int callConfirmationThreshold;

	@SerializedName("price_ofi_mb")
	private int priceOfiMb;

	@SerializedName("private_client")
	private boolean privateClient;

	@SerializedName("cfd")
	private boolean cfd;

	@SerializedName("private_clients")
	private List<Object> privateClients;

	@SerializedName("gas_price")
	private GasPrice gasPrice;

	@SerializedName("ap_on")
	private boolean apOn;

	@SerializedName("provider_ip")
	private String providerIp;

	@SerializedName("pafren_percentage")
	private int pafrenPercentage;

	@SerializedName("min_uplink_tier")
	private int minUplinkTier;

	@SerializedName("client_max_pafren")
	private int clientMaxPafren;

	@SerializedName("allow_handover")
	private boolean allowHandover;

	@SerializedName("version")
	private String version;

	@SerializedName("pfd")
	private boolean pfd;

	@SerializedName("cft")
	private boolean cft;

	@SerializedName("expected_sack_amount")
	private int expectedSackAmount;

	@SerializedName("account_set")
	private boolean accountSet;

	@SerializedName("port")
	private int port;

	@SerializedName("client_session")
	private ClientSession clientSession;

	@SerializedName("private_provider")
	private boolean privateProvider;

	@SerializedName("account")
	private Account account;

	@SerializedName("pft")
	private boolean pft;

	@SerializedName("e2e_mode")
	private boolean e2eMode;

	public void setMinDownlinkTier(int minDownlinkTier){
		this.minDownlinkTier = minDownlinkTier;
	}

	public int getMinDownlinkTier(){
		return minDownlinkTier;
	}

	public void setPriceOfiHr(int priceOfiHr){
		this.priceOfiHr = priceOfiHr;
	}

	public int getPriceOfiHr(){
		return priceOfiHr;
	}

	public void setInfuraApiKey(String infuraApiKey){
		this.infuraApiKey = infuraApiKey;
	}

	public String getInfuraApiKey(){
		return infuraApiKey;
	}

	public void setNetwork(String network){
		this.network = network;
	}

	public String getNetwork(){
		return network;
	}

	public void setClientOn(boolean clientOn){
		this.clientOn = clientOn;
	}

	public boolean isClientOn(){
		return clientOn;
	}

	public void setSsids(List<String> ssids){
		this.ssids = ssids;
	}

	public List<String> getSsids(){
		return ssids;
	}

	public void setSackPeriod(int sackPeriod){
		this.sackPeriod = sackPeriod;
	}

	public int getSackPeriod(){
		return sackPeriod;
	}

	public void setMinimumPafrenLength(int minimumPafrenLength){
		this.minimumPafrenLength = minimumPafrenLength;
	}

	public int getMinimumPafrenLength(){
		return minimumPafrenLength;
	}

	public void setMaxOfiMb(int maxOfiMb){
		this.maxOfiMb = maxOfiMb;
	}

	public int getMaxOfiMb(){
		return maxOfiMb;
	}

	public void setWlanInterface(String wlanInterface){
		this.wlanInterface = wlanInterface;
	}

	public String getWlanInterface(){
		return wlanInterface;
	}

	public void setGasOffer(GasOffer gasOffer){
		this.gasOffer = gasOffer;
	}

	public GasOffer getGasOffer(){
		return gasOffer;
	}

	public void setHandshakeTime(int handshakeTime){
		this.handshakeTime = handshakeTime;
	}

	public int getHandshakeTime(){
		return handshakeTime;
	}

	public void setMaxOfiHr(int maxOfiHr){
		this.maxOfiHr = maxOfiHr;
	}

	public int getMaxOfiHr(){
		return maxOfiHr;
	}

	public void setPrivateProviders(List<String> privateProviders){
		this.privateProviders = privateProviders;
	}

	public List<String> getPrivateProviders(){
		return privateProviders;
	}

	public void setExpectedPafrenAmount(int expectedPafrenAmount){
		this.expectedPafrenAmount = expectedPafrenAmount;
	}

	public int getExpectedPafrenAmount(){
		return expectedPafrenAmount;
	}

	public void setCallConfirmationThreshold(int callConfirmationThreshold){
		this.callConfirmationThreshold = callConfirmationThreshold;
	}

	public int getCallConfirmationThreshold(){
		return callConfirmationThreshold;
	}

	public void setPriceOfiMb(int priceOfiMb){
		this.priceOfiMb = priceOfiMb;
	}

	public int getPriceOfiMb(){
		return priceOfiMb;
	}

	public void setPrivateClient(boolean privateClient){
		this.privateClient = privateClient;
	}

	public boolean isPrivateClient(){
		return privateClient;
	}

	public void setCfd(boolean cfd){
		this.cfd = cfd;
	}

	public boolean isCfd(){
		return cfd;
	}

	public void setPrivateClients(List<Object> privateClients){
		this.privateClients = privateClients;
	}

	public List<Object> getPrivateClients(){
		return privateClients;
	}

	public void setGasPrice(GasPrice gasPrice){
		this.gasPrice = gasPrice;
	}

	public GasPrice getGasPrice(){
		return gasPrice;
	}

	public void setApOn(boolean apOn){
		this.apOn = apOn;
	}

	public boolean isApOn(){
		return apOn;
	}

	public void setProviderIp(String providerIp){
		this.providerIp = providerIp;
	}

	public String getProviderIp(){
		return providerIp;
	}

	public void setPafrenPercentage(int pafrenPercentage){
		this.pafrenPercentage = pafrenPercentage;
	}

	public int getPafrenPercentage(){
		return pafrenPercentage;
	}

	public void setMinUplinkTier(int minUplinkTier){
		this.minUplinkTier = minUplinkTier;
	}

	public int getMinUplinkTier(){
		return minUplinkTier;
	}

	public void setClientMaxPafren(int clientMaxPafren){
		this.clientMaxPafren = clientMaxPafren;
	}

	public int getClientMaxPafren(){
		return clientMaxPafren;
	}

	public void setAllowHandover(boolean allowHandover){
		this.allowHandover = allowHandover;
	}

	public boolean isAllowHandover(){
		return allowHandover;
	}

	public void setVersion(String version){
		this.version = version;
	}

	public String getVersion(){
		return version;
	}

	public void setPfd(boolean pfd){
		this.pfd = pfd;
	}

	public boolean isPfd(){
		return pfd;
	}

	public void setCft(boolean cft){
		this.cft = cft;
	}

	public boolean isCft(){
		return cft;
	}

	public void setExpectedSackAmount(int expectedSackAmount){
		this.expectedSackAmount = expectedSackAmount;
	}

	public int getExpectedSackAmount(){
		return expectedSackAmount;
	}

	public void setAccountSet(boolean accountSet){
		this.accountSet = accountSet;
	}

	public boolean isAccountSet(){
		return accountSet;
	}

	public void setPort(int port){
		this.port = port;
	}

	public int getPort(){
		return port;
	}

	public void setClientSession(ClientSession clientSession){
		this.clientSession = clientSession;
	}

	public ClientSession getClientSession(){
		return clientSession;
	}

	public void setPrivateProvider(boolean privateProvider){
		this.privateProvider = privateProvider;
	}

	public boolean isPrivateProvider(){
		return privateProvider;
	}

	public void setAccount(Account account){
		this.account = account;
	}

	public Account getAccount(){
		return account;
	}

	public void setPft(boolean pft){
		this.pft = pft;
	}

	public boolean isPft(){
		return pft;
	}

	public void setE2eMode(boolean e2eMode){
		this.e2eMode = e2eMode;
	}

	public boolean isE2eMode(){
		return e2eMode;
	}
}