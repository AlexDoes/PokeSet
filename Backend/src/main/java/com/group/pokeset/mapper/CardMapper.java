package com.group.pokeset.mapper;

import com.group.pokeset.model.Card;
import com.group.pokeset.payload.CardResponse;
import org.springframework.stereotype.Component;
import java.util.stream.Collectors;

@Component
public class CardMapper {

    public CardResponse toResponse(Card card) {
        if (card == null)
            return null;

        CardResponse response = new CardResponse();
        response.setId(card.getId());
        response.setName(formatName(card.getName()));
        response.setEvolvesFrom(card.getEvolvesFrom());
        response.setHp(card.getHp());
        response.setType(card.getType());
        response.setStage(card.getStage());
        response.setWeakness(card.getWeakness());
        response.setRetreat(card.getRetreat());
        response.setIllustrator(card.getIllustrator());
        response.setRarity(formatRarity(card.getRarity(), card.getId()));
        response.setAttribute(card.getAttribute());
        response.setDescription(card.getDescription());

        if (card.getAttacks() != null) {
            response.setAttacks(card.getAttacks().stream()
                    .map(this::mapAttack)
                    .collect(Collectors.toList()));
        }

        return response;
    }

    private String formatName(String originalName) {
        int spaceIndex = originalName.indexOf(" ");
        return spaceIndex != -1 ? originalName.substring(spaceIndex + 1).trim() : originalName;
    }

    private String formatRarity(String originalRarity, String id) {
        if (id.startsWith("PROMO"))
            return "Promo Rare";
        return originalRarity.replace("Ultra Rare", "Crown Rare");
    }

    private CardResponse.AttackDto mapAttack(Card.Attack attack) {
        if (attack == null)
            return null;

        CardResponse.AttackDto attackDto = new CardResponse.AttackDto();
        attackDto.setName(attack.getName());
        attackDto.setDamage(attack.getDamage());
        attackDto.setDescription(attack.getDescription());

        if (attack.getCost() != null) {
            attackDto.setCost(mapCost(attack.getCost()));
        }

        return attackDto;
    }

    private CardResponse.CostDto mapCost(Card.Cost cost) {
        if (cost == null)
            return null;

        CardResponse.CostDto costDto = new CardResponse.CostDto();
        costDto.setTotal(cost.getTotal());
        costDto.setTypes(cost.getTypes());

        return costDto;
    }
}