package ru.sinitsynme.turingapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import ru.sinitsynme.turingapi.engine.TuringEngineProperties;

@SpringBootApplication
@EnableMongoRepositories
@EnableConfigurationProperties(TuringEngineProperties.class)
public class TuringApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(TuringApiApplication.class, args);
	}




}
