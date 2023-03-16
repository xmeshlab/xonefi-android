package com.onefi.XOneFiApp.entities;

import com.google.gson.annotations.SerializedName;

public class ClientSession {
	private ClientSession(Builder builder) {
		setLastSackTimestamp(builder.lastSackTimestamp);
		setCost(builder.cost);
		setProviderAddress(builder.providerAddress);
		setPrefix(builder.prefix);
		setIp(builder.ip);
		setExpirationTimestamp(builder.expirationTimestamp);
		setSessionId(builder.sessionId);
		setPafrenPercentage(builder.pafrenPercentage);
		setNumberOfSacks(builder.numberOfSacks);
		setSsid(builder.ssid);
		setPafrenTimestamp(builder.pafrenTimestamp);
		setSackAmount(builder.sackAmount);
		setPfd(builder.pfd);
		setPafrenAmount(builder.pafrenAmount);
		setSackok(builder.sackok);
		setPort(builder.port);
		setRestricted(builder.restricted);
		setInitiatedSackNumber(builder.initiatedSackNumber);
		setScanCounter(builder.scanCounter);
		setFree(builder.free);
		setStatus(builder.status);
		setPft(builder.pft);
		setSackNumber(builder.sackNumber);
	}

	public static enum ClientSessionStatus {
		UNDEFINED(0),// pre-session status
		HANDSHAKE(1),// handshake stage
		ACTIVE(2),// active session
		SLEEP(3),// client did not provide SACK by deadline
		EXPIRED(4),// PAFREN expiration time reached
		CLOSED(5),// the session has been properly closed
		SCAN(6);// Scanning for SSIDs Stage
		private final int value;

		ClientSessionStatus(int value) {
			this.value = value;
		}

		public int getValue() {
			return this.value;
		}
	}

	@SerializedName("last_sack_timestamp")
	private long lastSackTimestamp;

	@SerializedName("cost")
	private int cost;

	@SerializedName("provider_address")
	private String providerAddress;

	@SerializedName("prefix")
	private String prefix;

	@SerializedName("ip")
	private String ip;

	@SerializedName("expiration_timestamp")
	private long expirationTimestamp;

	@SerializedName("session_id")
	private String sessionId;

	@SerializedName("pafren_percentage")
	private int pafrenPercentage;

	@SerializedName("number_of_sacks")
	private double numberOfSacks;

	@SerializedName("ssid")
	private String ssid;

	@SerializedName("pafren_timestamp")
	private long pafrenTimestamp;

	@SerializedName("sack_amount")
	private double sackAmount;

	@SerializedName("pfd")
	private boolean pfd;

	@SerializedName("pafren_amount")
	private double pafrenAmount;

	@SerializedName("sackok")
	private Message sackok;

	@SerializedName("port")
	private int port;

	@SerializedName("restricted")
	private boolean restricted;

	@SerializedName("initiated_sack_number")
	private int initiatedSackNumber;

	@SerializedName("scan_counter")
	private int scanCounter;

	@SerializedName("free")
	private boolean free;

	@SerializedName("status")
	private int status;

	@SerializedName("pft")
	private boolean pft;

	@SerializedName("sack_number")
	private int sackNumber;

	public void setLastSackTimestamp(long lastSackTimestamp) {
		this.lastSackTimestamp = lastSackTimestamp;
	}

	public long getLastSackTimestamp() {
		return lastSackTimestamp;
	}

	public void setCost(int cost) {
		this.cost = cost;
	}

	public int getCost() {
		return cost;
	}

	public void setProviderAddress(String providerAddress) {
		this.providerAddress = providerAddress;
	}

	public String getProviderAddress() {
		return providerAddress;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public String getPrefix() {
		return prefix;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getIp() {
		return ip;
	}

	public void setExpirationTimestamp(long expirationTimestamp) {
		this.expirationTimestamp = expirationTimestamp;
	}

	public long getExpirationTimestamp() {
		return expirationTimestamp;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setPafrenPercentage(int pafrenPercentage) {
		this.pafrenPercentage = pafrenPercentage;
	}

	public int getPafrenPercentage() {
		return pafrenPercentage;
	}

	public void setNumberOfSacks(double numberOfSacks) {
		this.numberOfSacks = numberOfSacks;
	}

	public double getNumberOfSacks() {
		return numberOfSacks;
	}

	public void setSsid(String ssid) {
		this.ssid = ssid;
	}

	public String getSsid() {
		return ssid;
	}

	public void setPafrenTimestamp(long pafrenTimestamp) {
		this.pafrenTimestamp = pafrenTimestamp;
	}

	public long getPafrenTimestamp() {
		return pafrenTimestamp;
	}

	public void setSackAmount(double sackAmount) {
		this.sackAmount = sackAmount;
	}

	public double getSackAmount() {
		return sackAmount;
	}

	public void setPfd(boolean pfd) {
		this.pfd = pfd;
	}

	public boolean isPfd() {
		return pfd;
	}

	public void setPafrenAmount(double pafrenAmount) {
		this.pafrenAmount = pafrenAmount;
	}

	public double getPafrenAmount() {
		return pafrenAmount;
	}

	public void setSackok(Message sackok) {
		this.sackok = sackok;
	}

	public Message getSackok() {
		return sackok;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public int getPort() {
		return port;
	}

	public void setRestricted(boolean restricted) {
		this.restricted = restricted;
	}

	public boolean isRestricted() {
		return restricted;
	}

	public void setInitiatedSackNumber(int initiatedSackNumber) {
		this.initiatedSackNumber = initiatedSackNumber;
	}

	public int getInitiatedSackNumber() {
		return initiatedSackNumber;
	}

	public void setScanCounter(int scanCounter) {
		this.scanCounter = scanCounter;
	}

	public int getScanCounter() {
		return scanCounter;
	}

	public void setFree(boolean free) {
		this.free = free;
	}

	public boolean isFree() {
		return free;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getStatus() {
		return status;
	}

	public void setPft(boolean pft) {
		this.pft = pft;
	}

	public boolean isPft() {
		return pft;
	}

	public void setSackNumber(int sackNumber) {
		this.sackNumber = sackNumber;
	}

	public int getSackNumber() {
		return sackNumber;
	}

	public static final class Builder {
		private long lastSackTimestamp;
		private int cost;
		private String providerAddress;
		private String prefix;
		private String ip;
		private long expirationTimestamp;
		private String sessionId;
		private int pafrenPercentage;
		private double numberOfSacks;
		private String ssid;
		private long pafrenTimestamp;
		private double sackAmount;
		private boolean pfd;
		private double pafrenAmount;
		private Message sackok;
		private int port;
		private boolean restricted;
		private int initiatedSackNumber;
		private int scanCounter;
		private boolean free;
		private int status;
		private boolean pft;
		private int sackNumber;

		public Builder() {
		}

		public Builder lastSackTimestamp(long val) {
			lastSackTimestamp = val;
			return this;
		}

		public Builder cost(int val) {
			cost = val;
			return this;
		}

		public Builder providerAddress(String val) {
			providerAddress = val;
			return this;
		}

		public Builder prefix(String val) {
			prefix = val;
			return this;
		}

		public Builder ip(String val) {
			ip = val;
			return this;
		}

		public Builder expirationTimestamp(long val) {
			expirationTimestamp = val;
			return this;
		}

		public Builder sessionId(String val) {
			sessionId = val;
			return this;
		}

		public Builder pafrenPercentage(int val) {
			pafrenPercentage = val;
			return this;
		}

		public Builder numberOfSacks(double val) {
			numberOfSacks = val;
			return this;
		}

		public Builder ssid(String val) {
			ssid = val;
			return this;
		}

		public Builder pafrenTimestamp(long val) {
			pafrenTimestamp = val;
			return this;
		}

		public Builder sackAmount(double val) {
			sackAmount = val;
			return this;
		}

		public Builder pfd(boolean val) {
			pfd = val;
			return this;
		}

		public Builder pafrenAmount(double val) {
			pafrenAmount = val;
			return this;
		}

		public Builder sackok(Message val) {
			sackok = val;
			return this;
		}

		public Builder port(int val) {
			port = val;
			return this;
		}

		public Builder restricted(boolean val) {
			restricted = val;
			return this;
		}

		public Builder initiatedSackNumber(int val) {
			initiatedSackNumber = val;
			return this;
		}

		public Builder scanCounter(int val) {
			scanCounter = val;
			return this;
		}

		public Builder free(boolean val) {
			free = val;
			return this;
		}

		public Builder status(int val) {
			status = val;
			return this;
		}

		public Builder pft(boolean val) {
			pft = val;
			return this;
		}

		public Builder sackNumber(int val) {
			sackNumber = val;
			return this;
		}

		public ClientSession build() {
			return new ClientSession(this);
		}
	}
}