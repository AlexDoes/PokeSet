package com.group.pokeset.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;
import java.util.Map;

@Data
@Document(collection = "cards")
public class Card {

    @Id
    private String _id;

    @Field("id")
    private String id;

    private String name;
    private String evolvesFrom;
    private String hp;
    private List<Attack> attacks;
    private String description;
    private String type;
    private String stage;
    private String weakness;
    private Integer retreat;
    private String illustrator;
    private String rarity;
    private String attribute;

    @Data
    public static class Attack {
        private String name;
        private String damage;
        private String description;
        private Cost cost;
    }

    @Data
    public static class Cost {
        private Integer total;
        private Map<String, Integer> types;
    }
}