package ru.sinitsynme.turingapi.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import ru.sinitsynme.turingapi.entity.Algorythm;
import ru.sinitsynme.turingapi.repository.AlgorythmRepository;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;

@Component
public class BasicAlgorythmProvider {
    private static final String ADDITION_ALGORYTHM_FILE = "basicAlgos/addition.json";
    private static final String GCD_ALGORYTHM_FILE = "basicAlgos/gcd.json";
    private final AlgorythmRepository algorythmRepository;
    private final ObjectMapper objectMapper;
    private final Logger log = LoggerFactory.getLogger(BasicAlgorythmProvider.class);

    public BasicAlgorythmProvider(AlgorythmRepository algorythmRepository, ObjectMapper objectMapper) {
        this.algorythmRepository = algorythmRepository;
        this.objectMapper = objectMapper;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void saveBasicAlgosAfterStartup() throws URISyntaxException, IOException {
        saveAlgoFromFile(ADDITION_ALGORYTHM_FILE);
        saveAlgoFromFile(GCD_ALGORYTHM_FILE);
    }


    private void saveAlgoFromFile(String fileName) throws URISyntaxException, IOException {
        String algorythmJson = readFileFromResources(fileName);
        Algorythm algorythm = objectMapper.readValue(algorythmJson, Algorythm.class);
        algorythmRepository.save(algorythm);
        log.info("Basic algorythm saved: {}", algorythm.getName());
    }

    private static String readFileFromResources(String filename) throws URISyntaxException, IOException {
        URL resource = BasicAlgorythmProvider.class.getClassLoader().getResource(filename);

        if (resource == null)
            throw new FileNotFoundException("Файл с базовым алгоритмом не найден!");

        byte[] bytes = Files.readAllBytes(Paths.get(resource.toURI()));
        return new String(bytes);
    }


}
