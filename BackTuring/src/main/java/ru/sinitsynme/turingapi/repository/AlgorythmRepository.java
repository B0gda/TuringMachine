package ru.sinitsynme.turingapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import ru.sinitsynme.turingapi.entity.Algorythm;

@Repository
public interface AlgorythmRepository extends MongoRepository<Algorythm, String> {
}
