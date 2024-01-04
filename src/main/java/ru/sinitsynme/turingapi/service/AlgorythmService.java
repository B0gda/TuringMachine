package ru.sinitsynme.turingapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sinitsynme.turingapi.engine.TuringEngine;
import ru.sinitsynme.turingapi.entity.Algorythm;
import ru.sinitsynme.turingapi.entity.AlgorythmSolutionStep;
import ru.sinitsynme.turingapi.exception.types.AlgorythmNotFoundException;
import ru.sinitsynme.turingapi.mapper.AlgorythmMapper;
import ru.sinitsynme.turingapi.repository.AlgorythmRepository;
import ru.sinitsynme.turingapi.rest.dto.AlgorythmRequestDto;
import ru.sinitsynme.turingapi.rest.dto.AlgorythmResponseDto;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class AlgorythmService {

    private final AlgorythmMapper algorythmMapper;
    private final AlgorythmRepository algorythmRepository;
    private final TuringEngine turingEngine;

    @Autowired
    public AlgorythmService(AlgorythmMapper algorythmMapper, AlgorythmRepository algorythmRepository, TuringEngine turingEngine) {
        this.algorythmMapper = algorythmMapper;
        this.algorythmRepository = algorythmRepository;
        this.turingEngine = turingEngine;
    }

    public List<AlgorythmResponseDto> getAllAlgosData() {
        return algorythmRepository
                .findAll()
                .stream()
                .map(algorythmMapper::mapAlgorythmToResponseDto)
                .collect(Collectors.toList());
    }

    public AlgorythmResponseDto saveAlgorythm(AlgorythmRequestDto requestDto) {
        Algorythm algorythm = algorythmMapper.mapAlgorythmFromDto(requestDto);
        algorythmRepository.insert(algorythm);
        return algorythmMapper.mapAlgorythmToResponseDto(algorythm);
    }

    public List<AlgorythmSolutionStep> executeAlgorythm(String id, String tape) {
        Algorythm algorythm = getAlgorythm(id);
        return turingEngine.solveAlgorythm(algorythm, tape);
    }

    public Algorythm getAlgorythm(String algorythmId) {
        try {
            return algorythmRepository.findById(algorythmId).orElseThrow();
        } catch (NoSuchElementException e) {
            throw new AlgorythmNotFoundException(
                    String.format("Алгоритм с id= %s не найден", algorythmId)
            );
        }
    }

    public Algorythm editAlgorythm(String algorythmId, AlgorythmRequestDto algorythmRequestDto) {
        Algorythm algorythm = algorythmMapper.mapAlgorythmFromDto(algorythmRequestDto);
        Algorythm algorythmFromDb = algorythmRepository.findById(algorythmId).orElseThrow();
        algorythmFromDb.setName(algorythm.getName());
        algorythmFromDb.setBasic(algorythm.isBasic());
        algorythmFromDb.setStates(algorythm.getStates());
        algorythmFromDb.setAlphabet(algorythm.getAlphabet());
        algorythmFromDb.setSymbols(algorythm.getSymbols());
        return algorythmRepository.save(algorythmFromDb);
    }
}
