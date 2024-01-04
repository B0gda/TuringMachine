package ru.sinitsynme.turingapi.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.sinitsynme.turingapi.exception.types.AlgorythmNotFoundException;
import ru.sinitsynme.turingapi.exception.types.NoCommandException;
import ru.sinitsynme.turingapi.exception.types.SolutionTimeoutException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(BAD_REQUEST)
    public ResponseEntity<ExceptionResponse> illegalArgumentException(IllegalArgumentException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(
                ex.getMessage(),
                BAD_REQUEST.value()
        );

        return new ResponseEntity<>(exceptionResponse, BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(BAD_REQUEST)
    public ResponseEntity<ExceptionResponse> jsonParseException(HttpMessageNotReadableException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(
                ex.getMessage(),
                BAD_REQUEST.value()
        );

        return new ResponseEntity<>(exceptionResponse, BAD_REQUEST);
    }

    @ExceptionHandler(AlgorythmNotFoundException.class)
    @ResponseStatus(NOT_FOUND)
    public ResponseEntity<ExceptionResponse> algorythmNotFoundException(AlgorythmNotFoundException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(
                ex.getMessage(),
                BAD_REQUEST.value()
        );

        return new ResponseEntity<>(exceptionResponse, BAD_REQUEST);
    }


    @ExceptionHandler(NoCommandException.class)
    @ResponseStatus(BAD_REQUEST)
    public ResponseEntity<ExceptionResponse> noCommandException(NoCommandException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(
                ex.getMessage(),
                BAD_REQUEST.value()
        );

        return new ResponseEntity<>(exceptionResponse, BAD_REQUEST);
    }

    @ExceptionHandler(SolutionTimeoutException.class)
    @ResponseStatus(BAD_REQUEST)
    public ResponseEntity<ExceptionResponse> solutionTimeoutException(SolutionTimeoutException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(
                ex.getMessage(),
                BAD_REQUEST.value()
        );

        return new ResponseEntity<>(exceptionResponse, BAD_REQUEST);
    }
}
