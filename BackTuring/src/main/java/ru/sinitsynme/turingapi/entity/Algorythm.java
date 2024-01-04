package ru.sinitsynme.turingapi.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Set;

@Document("algorythms")
public class Algorythm {
    @Id
    private String id;
    private String name;
    private String alphabet;
    private boolean isBasic;
    private Set<String> states;
    private List<SymbolStates> symbols;

    public Algorythm() {
    }

    public Algorythm(String id, String name, String alphabet, boolean isBasic, Set<String> states, List<SymbolStates> symbols) {
        this.id = id;
        this.name = name;
        this.alphabet = alphabet;
        this.isBasic = isBasic;
        this.states = states;
        this.symbols = symbols;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Set<String> getStates() {
        return states;
    }

    public void setStates(Set<String> states) {
        this.states = states;
    }

    public List<SymbolStates> getSymbols() {
        return symbols;
    }

    public void setSymbols(List<SymbolStates> symbols) {
        this.symbols = symbols;
    }

    public String getAlphabet() {
        return alphabet;
    }

    public void setAlphabet(String alphabet) {
        this.alphabet = alphabet;
    }
}
