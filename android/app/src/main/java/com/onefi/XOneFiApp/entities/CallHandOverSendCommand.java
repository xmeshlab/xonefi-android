package com.onefi.XOneFiApp.entities;

public  class CallHandOverSendCommand implements CallHandOverCommand {
    private String op;
    private String from;
    private String uuid;
    private long timeStamp;
    private String session;
    private String re;
    private Message arguments;

    public String getSignature() {
        return signature;
    }

    private String signature;
    public String getOp() {
        return op;
    }

    public String getFrom() {
        return from;
    }

    public String getUuid() {
        return uuid;
    }

    public long getTimeStamp() {
        return timeStamp;
    }

    public String getSession() {
        return session;
    }

    public String getRe() {
        return re;
    }

    public Message getArguments() {
        return arguments;
    }

    public void setOp(String op) {
        this.op = op;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public void setTimeStamp(long timeStamp) {
        this.timeStamp = timeStamp;
    }

    public void setSession(String session) {
        this.session = session;
    }

    public void setRe(String re) {
        this.re = re;
    }

    public void setArguments(Message arguments) {
        this.arguments = arguments;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }
}