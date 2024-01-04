package ru.sinitsynme.turingapi.rest.dto;

import java.util.List;

public class AlgorythmRequestDto {

    private String name;
    private boolean isBasic;
    private String alphabet;
    private List<SymbolStatesDto> symbols;

    public AlgorythmRequestDto() {
    }

    public AlgorythmRequestDto(String name, boolean isBasic, String alphabet, List<SymbolStatesDto> symbols) {
        this.name = name;
        this.isBasic = isBasic;
        this.alphabet = alphabet;
        this.symbols = symbols;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isBasic() {
        return isBasic;
    }

    public void setBasic(boolean basic) {
        isBasic = basic;
    }

    public String getAlphabet() {
        return alphabet;
    }

    public void setAlphabet(String alphabet) {
        this.alphabet = alphabet;
    }

    public List<SymbolStatesDto> getSymbols() {
        return symbols;
    }

    public void setSymbols(List<SymbolStatesDto> symbols) {
        this.symbols = symbols;
    }
}
