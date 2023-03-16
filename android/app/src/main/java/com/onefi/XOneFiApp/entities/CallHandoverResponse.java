package com.onefi.XOneFiApp.entities;

public class CallHandoverResponse {
    private CallHandoverResponseCommand command;

    public CallHandoverResponseCommand getCommand() {
        return command;
    }

    public void setCommand(CallHandoverResponseCommand command) {
        this.command = command;
    }

    public static class CallHandoverResponseCommand {
        private CallHandoverResponseCommandArguments arguments;
        private String from;
        public CallHandoverResponseCommandArguments getArguments() {
            return arguments;
        }

        public void setArguments(CallHandoverResponseCommandArguments arguments) {
            this.arguments = arguments;
        }

        public String getFrom() {
            return from;
        }

        public void setFrom(String from) {
            this.from = from;
        }
    }

    public static class CallHandoverResponseCommandArguments {
        // "HANDOVER-OK" or other
        private String answer;

        public String getAnswer() {
            return answer;
        }

        public void setAnswer(String answer) {
            this.answer = answer;
        }
    }
}

