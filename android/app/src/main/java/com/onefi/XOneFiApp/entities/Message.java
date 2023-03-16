package com.onefi.XOneFiApp.entities;


public  class Message<T extends CommandArgs>{
    private Command<T> command;
    public Command<T> getCommand () {
        return command;
    }
    private String signature;
    public Message () {}
    public void setCommand(Command<T> command) {
        this.command = command;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }
}