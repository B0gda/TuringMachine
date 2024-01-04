package ru.sinitsynme.turingapi.rest.dto;

import java.util.Map;

public class SymbolStatesDto {

    private Character symbol;
    private Map<String, CommandDto> states;

    public SymbolStatesDto() {
    }

    public SymbolStatesDto(Character symbol, Map<String, CommandDto> states) {
        this.symbol = symbol;
        this.states = states;
    }

    public Character getSymbol() {
        return symbol;
    }

    public void setSymbol(Character symbol) {
        this.symbol = symbol;
    }

    public Map<String, CommandDto> getStates() {
        return states;
    }

    public void setStates(Map<String, CommandDto> states) {
        this.states = states;
    }
}
