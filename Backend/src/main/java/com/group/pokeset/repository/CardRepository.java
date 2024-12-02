package com.group.pokeset.repository;

import com.group.pokeset.model.Card;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface CardRepository extends MongoRepository<Card, String> {
    Card findByName(String name);

    Optional<Card> findById(String Id);

    @Query("{ 'id' : ?0 }")
    Optional<Card> findByCardId(String id);

    Page<Card> findAllByType(String type, Pageable pageable);
}
