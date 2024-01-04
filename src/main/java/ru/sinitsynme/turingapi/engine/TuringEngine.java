package ru.sinitsynme.turingapi.engine;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import ru.sinitsynme.turingapi.entity.*;
import ru.sinitsynme.turingapi.exception.types.NoCommandException;
import ru.sinitsynme.turingapi.exception.types.SolutionTimeoutException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class TuringEngine {

    private TuringEngineProperties turingEngineProperties;
    private Map<SymbolStatePair, Command> optimizedAlgorythmMap;
    private String currentState;
    private int caretIndex = 0;

    private Logger log = LoggerFactory.getLogger(TuringEngine.class);

    public TuringEngine(TuringEngineProperties turingEngineProperties) {
        this.turingEngineProperties = turingEngineProperties;
    }

    public List<AlgorythmSolutionStep> solveAlgorythm(Algorythm algorythm, String tape) {
        caretIndex = 0;
        currentState = turingEngineProperties.getFirstState();
        optimizedAlgorythmMap = optimizeAlgorythmFromDbToMap(algorythm);

        List<AlgorythmSolutionStep> solutionSteps = new ArrayList<>();

        long timeout = turingEngineProperties.getMsTimeout();
        long solvingStartTime = System.currentTimeMillis();

        log.info("Starting to solve algorythm: " + algorythm.getName());
        log.info("Max duration in ms: " + timeout);
        log.info("Solving start time: " + solvingStartTime);

        while (!currentState.equals(turingEngineProperties.getFinalState())) {

            checkTimeout(solvingStartTime, timeout);

            solutionSteps.add(fixStep(tape));
            tape = getTapeAfterOneIteration(tape);
        }

        log.info("Алгоритм выполнен!");

        solutionSteps.add(fixStep(tape));
        return solutionSteps;
    }

    private void checkTimeout(long solvingStartTime, long timeout) {
        long now = System.currentTimeMillis();

        if (now - solvingStartTime > timeout) {
            log.warn("Алгоритм зациклился");
            throw new SolutionTimeoutException("Время выполнения алгоритма превысило допустимое!");
        }
    }

    private AlgorythmSolutionStep fixStep(String tape) {
        return new AlgorythmSolutionStep(tape, caretIndex, currentState);
    }

    private Map<SymbolStatePair, Command> optimizeAlgorythmFromDbToMap(Algorythm algorythm) {
        Map<SymbolStatePair, Command> optimizedAlgorythmMap = new HashMap<>();
        algorythm.getSymbols().forEach(
                symbol -> symbol.getStates().forEach(
                        (state, command) -> {
                            SymbolStatePair symbolStatePair = new SymbolStatePair(symbol.getSymbol(), state);
                            optimizedAlgorythmMap.put(symbolStatePair, command);
                        }
                )
        );
        return optimizedAlgorythmMap;
    }

    private String getTapeAfterOneIteration(String tape) {
        char currentSymbol = tape.charAt(caretIndex);

        Command command = optimizedAlgorythmMap.get(new SymbolStatePair(currentSymbol, currentState));

        if (command == null) {
            throw new NoCommandException(String.format("Команды для символа %s и состония %s нет",
                    currentSymbol, currentState));
        }

        char overwrittenSymbol = command.getSymbol();
        String newTape = replaceChar(tape, overwrittenSymbol, caretIndex);

        currentState = command.getNextState();
        moveCaret(command.getMoveCaretOption());

        newTape = checkAndExtendTapeIfNeeded(newTape);
        return newTape;
    }


    private void moveCaret(MoveCaretOption moveCaretOption) {
        if (moveCaretOption == MoveCaretOption.RIGHT) {
            caretIndex++;
        } else if (moveCaretOption == MoveCaretOption.LEFT) {
            caretIndex--;
        }
    }

    private String replaceChar(String str, char newChar, int index) {
        char[] chars = str.toCharArray();
        chars[index] = newChar;
        return String.valueOf(chars);
    }

    private String checkAndExtendTapeIfNeeded(String tape) {
        if (caretIndex == -1) {
            tape = " " + tape;
            caretIndex++;
        }
        else if (caretIndex == tape.length()) {
            tape = tape + " ";
            caretIndex--;
        }
        return tape;
    }
}
