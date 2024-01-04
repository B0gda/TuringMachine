package ru.sinitsynme.turingapi.exception.types;

public class SolutionTimeoutException extends RuntimeException {

    public SolutionTimeoutException() {
    }

    public SolutionTimeoutException(String message) {
        super(message);
    }

    public SolutionTimeoutException(String message, Throwable cause) {
        super(message, cause);
    }
}
