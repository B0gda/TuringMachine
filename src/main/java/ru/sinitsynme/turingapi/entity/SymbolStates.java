package ru.sinitsynme.turingapi.entity;

import java.util.Map;

public class SymbolStates {

    private Character symbol;
    private Map<String, Command> states;

    public SymbolStates() {
    }

    public SymbolStates(Character symbol, Map<String, Command> states) {
        this.symbol = symbol;
        this.states = states;
    }

    public Character getSymbol() {
        return symbol;
    }

    public void setSymbol(Character symbol) {
        this.symbol = symbol;
    }

    public Map<String, Command> getStates() {
        return states;
    }

    public void setStates(Map<String, Command> states) {
        this.states = states;
    }
}
