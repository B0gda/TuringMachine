package ru.sinitsynme.turingapi.exception;

public class ExceptionResponse {
    private String message;
    private int responseStatus;

    public ExceptionResponse() {
    }

    public ExceptionResponse(String message, int responseStatus) {
        this.message = message;
        this.responseStatus = responseStatus;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getResponseStatus() {
        return responseStatus;
    }

    public void setResponseStatus(int responseStatus) {
        this.responseStatus = responseStatus;
    }
}
