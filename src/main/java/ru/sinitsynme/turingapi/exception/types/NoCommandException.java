package ru.sinitsynme.turingapi.exception.types;

public class NoCommandException extends RuntimeException {

    public NoCommandException() {
    }

    public NoCommandException(String message) {
        super(message);
    }

    public NoCommandException(String message, Throwable cause) {
        super(message, cause);
    }
}
