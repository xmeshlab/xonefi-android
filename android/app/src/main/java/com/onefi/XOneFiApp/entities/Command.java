package com.onefi.XOneFiApp.entities;

public class Command<T extends CommandArgs> {

    public String op;
    public String from;
    public String uuid;
    public long timestamp;
    public String session;
    public String re;
    public T arguments;

    private Command(Builder<T> builder) {
        op = builder.op;
        from = builder.from;
        uuid = builder.uuid;
        timestamp = builder.timestamp;
        session = builder.session;
        re = builder.re;
        arguments = builder.arguments;
    }

    public static final class Builder<T> {
        private String op;
        private String from;
        private String uuid;
        private long timestamp;
        private String session;
        private String re;
        private T arguments;

        public Builder() {
        }

        public Builder op(String val) {
            op = val;
            return this;
        }

        public Builder from(String val) {
            from = val;
            return this;
        }

        public Builder uuid(String val) {
            uuid = val;
            return this;
        }

        public Builder timestamp(long val) {
            timestamp = val;
            return this;
        }

        public Builder session(String val) {
            session = val;
            return this;
        }

        public Builder re(String val) {
            re = val;
            return this;
        }

        public Builder arguments(T val) {
            arguments = val;
            return this;
        }

        public Command build() {
            return new Command(this);
        }
    }
}
