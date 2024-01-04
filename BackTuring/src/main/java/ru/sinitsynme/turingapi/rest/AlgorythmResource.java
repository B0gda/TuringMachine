package ru.sinitsynme.turingapi.rest;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sinitsynme.turingapi.entity.Algorythm;
import ru.sinitsynme.turingapi.entity.AlgorythmSolutionStep;
import ru.sinitsynme.turingapi.rest.dto.AlgorythmRequestDto;
import ru.sinitsynme.turingapi.rest.dto.AlgorythmResponseDto;
import ru.sinitsynme.turingapi.service.AlgorythmService;

import java.util.List;

@RestController
@RequestMapping("/algorythm")
public class AlgorythmResource {

    private final AlgorythmService algorythmService;

    @Autowired
    public AlgorythmResource(AlgorythmService algorythmService) {
        this.algorythmService = algorythmService;
    }

    @Operation(summary = "Получить данные обо всех алгоритмах")
    @GetMapping
    public ResponseEntity<List<AlgorythmResponseDto>> getAllAlgoIds() {
        return ResponseEntity.ok(algorythmService.getAllAlgosData());
    }

    @Operation(summary = "Сохранить алгоритм")
    @PostMapping
    public ResponseEntity<AlgorythmResponseDto> saveAlgorythm(@RequestBody AlgorythmRequestDto algorythmRequestDto) {
        return ResponseEntity.ok(algorythmService.saveAlgorythm(algorythmRequestDto));
    }

    @Operation(summary = "Исполнить алгоритм по ID")
    @GetMapping("{id}/execute")
    public ResponseEntity<List<AlgorythmSolutionStep>> executeAlgorythm(@PathVariable("id") String algorythmId, @RequestParam String tape) {
        return ResponseEntity.ok(algorythmService.executeAlgorythm(algorythmId, tape));
    }

    @Operation(summary = "Получить алгоритм по ID")
    @GetMapping("/{id}")
    public ResponseEntity<Algorythm> getAlgorythmById(@PathVariable("id") String algorythmId) {
        return ResponseEntity.ok(algorythmService.getAlgorythm(algorythmId));
    }

    @Operation(summary = "Отредактировать алгоритм")
    @PostMapping("/{id}")
    public ResponseEntity<Algorythm> editAlgorythm(@PathVariable("id") String algorythmId, @RequestBody  AlgorythmRequestDto algorythmRequestDto) {
        return ResponseEntity.ok(algorythmService.editAlgorythm(algorythmId, algorythmRequestDto));
    }

}
