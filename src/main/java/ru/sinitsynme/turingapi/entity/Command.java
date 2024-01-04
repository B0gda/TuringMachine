package ru.sinitsynme.turingapi.entity;

public class Command {

    private Character symbol;
    private String nextState;
    private MoveCaretOption moveCaretOption;

    public Command() {
    }

    public Command(Character symbol, String nextState, MoveCaretOption moveCaretOption) {
        this.symbol = symbol;
        this.nextState = nextState;
        this.moveCaretOption = moveCaretOption;
    }

    public Character getSymbol() {
        return symbol;
    }

    public void setSymbol(Character symbol) {
        this.symbol = symbol;
    }

    public String getNextState() {
        return nextState;
    }

    public void setNextState(String nextState) {
        this.nextState = nextState;
    }

    public MoveCaretOption getMoveCaretOption() {
        return moveCaretOption;
    }

    public void setMoveCaretOption(MoveCaretOption moveCaretOption) {
        this.moveCaretOption = moveCaretOption;
    }
}
