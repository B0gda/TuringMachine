package ru.sinitsynme.turingapi.entity;

import java.util.Objects;

public class SymbolStatePair {
    private Character symbol;
    private String state;

    public SymbolStatePair(Character symbol, String state) {
        this.symbol = symbol;
        this.state = state;
    }

    public Character getSymbol() {
        return symbol;
    }

    public void setSymbol(Character symbol) {
        this.symbol = symbol;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SymbolStatePair that = (SymbolStatePair) o;
        return Objects.equals(symbol, that.symbol) && Objects.equals(state, that.state);
    }

    @Override
    public int hashCode() {
        return Objects.hash(symbol, state);
    }
}
