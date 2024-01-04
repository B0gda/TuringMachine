package ru.sinitsynme.turingapi.mapper;

import org.springframework.stereotype.Component;
import ru.sinitsynme.turingapi.entity.Algorythm;
import ru.sinitsynme.turingapi.entity.Command;
import ru.sinitsynme.turingapi.entity.MoveCaretOption;
import ru.sinitsynme.turingapi.entity.SymbolStates;
import ru.sinitsynme.turingapi.rest.dto.AlgorythmRequestDto;
import ru.sinitsynme.turingapi.rest.dto.AlgorythmResponseDto;
import ru.sinitsynme.turingapi.rest.dto.CommandDto;
import ru.sinitsynme.turingapi.rest.dto.SymbolStatesDto;

import java.util.*;

@Component
public class AlgorythmMapper {

    public AlgorythmResponseDto mapAlgorythmToResponseDto(Algorythm algorythm) {
        AlgorythmResponseDto responseDto = new AlgorythmResponseDto();
        responseDto.setId(algorythm.getId());
        responseDto.setName(algorythm.getName());
        responseDto.setBasic(algorythm.isBasic());
        return responseDto;
    }

    public Algorythm mapAlgorythmFromDto(AlgorythmRequestDto requestDto) {
        Algorythm algorythm = new Algorythm();
        algorythm.setName(requestDto.getName());
        algorythm.setBasic(requestDto.isBasic());
        algorythm.setAlphabet(requestDto.getAlphabet());

        List<SymbolStates> symbolStates = requestDto
                .getSymbols()
                .stream()
                .map(this::mapSymbolStatesFromDto)
                .toList();

        algorythm.setSymbols(symbolStates);
        algorythm.setStates(getAllStates(requestDto));

        return algorythm;
    }

    private SymbolStates mapSymbolStatesFromDto(SymbolStatesDto symbolStatesDto) {
        SymbolStates symbolStates = new SymbolStates();
        symbolStates.setSymbol(symbolStatesDto.getSymbol());

        Map<String, Command> statesCommands = new HashMap<>();

        symbolStatesDto.getStates().forEach((key, value) -> {
            statesCommands.put(key, mapCommandFromDto(value));
        });

        symbolStates.setStates(statesCommands);
        return symbolStates;
    }

    private Command mapCommandFromDto(CommandDto commandDto) {
        Command command = new Command();
        command.setNextState(commandDto.getNextState());
        command.setSymbol(commandDto.getSymbol());
        command.setMoveCaretOption(MoveCaretOption.parseFromAlias(commandDto.getMoveCaretOption()));

        return command;
    }

    private Set<String> getAllStates(AlgorythmRequestDto algorythmRequestDto) {
        Set<String> statesSet = new HashSet<>();

        algorythmRequestDto.getSymbols().forEach(
                it -> it.getStates().forEach((key, value) -> {
                            statesSet.add(key);
                            statesSet.add(value.getNextState());
                        }
                )
        );
        return statesSet;
    }
}
