package com.group.pokeset.payload;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class CardResponse {
    private String id;
    private String name;
    private String evolvesFrom;
    private String hp;
    private List<AttackDto> attacks;
    private String type;
    private String stage;
    private String weakness;
    private Integer retreat;
    private String illustrator;
    private String rarity;
    private String attribute;
    private String description;

    @Data
    public static class AttackDto {
        private String name;
        private String damage;
        private String description;
        private CostDto cost;
    }

    @Data
    public static class CostDto {
        private Integer total;
        private Map<String, Integer> types;
    }
}