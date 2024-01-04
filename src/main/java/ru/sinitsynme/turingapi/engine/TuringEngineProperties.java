package ru.sinitsynme.turingapi.engine;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "turing")
public class TuringEngineProperties {

    private String firstState;
    private String finalState;
    private int msTimeout;

    public String getFirstState() {
        return firstState;
    }

    public void setFirstState(String firstState) {
        this.firstState = firstState;
    }

    public String getFinalState() {
        return finalState;
    }

    public void setFinalState(String finalState) {
        this.finalState = finalState;
    }

    public int getMsTimeout() {
        return msTimeout;
    }

    public void setMsTimeout(int msTimeout) {
        this.msTimeout = msTimeout;
    }
}
