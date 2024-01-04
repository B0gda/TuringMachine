package ru.sinitsynme.turingapi.rest.dto;

public class CommandDto {
    private String nextState;
    private Character symbol;
    private Character moveCaretOption;

    public CommandDto() {
    }

    public CommandDto(String nextState, Character symbol, Character moveCaretOption) {
        this.nextState = nextState;
        this.symbol = symbol;
        this.moveCaretOption = moveCaretOption;
    }

    public String getNextState() {
        return nextState;
    }

    public void setNextState(String nextState) {
        this.nextState = nextState;
    }

    public Character getSymbol() {
        return symbol;
    }

    public void setSymbol(Character symbol) {
        this.symbol = symbol;
    }

    public Character getMoveCaretOption() {
        return moveCaretOption;
    }

    public void setMoveCaretOption(Character moveCaretOption) {
        this.moveCaretOption = moveCaretOption;
    }


}
