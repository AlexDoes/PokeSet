package com.group.pokeset.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.context.annotation.Bean;

@Configuration
@EnableMongoRepositories(basePackages = "com.group.pokeset.repository")
public class MongoConfig extends AbstractMongoClientConfiguration {
    
    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;
    
    @Override
    protected String getDatabaseName() {
        return "pokeset";
    }

    @Override
    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create(mongoUri);
    }

    @Override
    protected boolean autoIndexCreation() {
        return true;
    }
}