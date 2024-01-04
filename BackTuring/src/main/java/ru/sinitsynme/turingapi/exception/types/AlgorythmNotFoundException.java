package ru.sinitsynme.turingapi.exception.types;

public class AlgorythmNotFoundException extends RuntimeException{

    public AlgorythmNotFoundException() {
        super();
    }

    public AlgorythmNotFoundException(String message) {
        super(message);
    }

    public AlgorythmNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
