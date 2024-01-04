package ru.sinitsynme.turingapi.entity;

public class AlgorythmSolutionStep {
    private String tape;
    private int currentCaretPosition;
    private String currentState;

    public AlgorythmSolutionStep() {
    }

    public AlgorythmSolutionStep(String tape, int currentCaretPosition, String currentState) {
        this.tape = tape;
        this.currentCaretPosition = currentCaretPosition;
        this.currentState = currentState;
    }

    public String getTape() {
        return tape;
    }

    public void setTape(String tape) {
        this.tape = tape;
    }

    public int getCurrentCaretPosition() {
        return currentCaretPosition;
    }

    public void setCurrentCaretPosition(int currentCaretPosition) {
        this.currentCaretPosition = currentCaretPosition;
    }

    public String getCurrentState() {
        return currentState;
    }

    public void setCurrentState(String currentState) {
        this.currentState = currentState;
    }
}
