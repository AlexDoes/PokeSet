package com.group.pokeset;

import org.junit.jupiter.api.AfterEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
public abstract class BaseTest {

    @Autowired
    protected MongoTemplate mongoTemplate;

    @AfterEach
    void cleanUp() {
        mongoTemplate.getCollectionNames().forEach(collectionName -> mongoTemplate.dropCollection(collectionName));
    }
}