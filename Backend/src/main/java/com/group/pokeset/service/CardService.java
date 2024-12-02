package com.group.pokeset.service;

import com.group.pokeset.exception.ResourceNotFoundException;
import com.group.pokeset.model.Card;
import com.group.pokeset.payload.CardResponse;
import com.group.pokeset.payload.PagedResponse;
import com.group.pokeset.repository.CardRepository;
import com.group.pokeset.mapper.CardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.Cacheable;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CardService {

        private final CardRepository cardRepository;
        private final CardMapper cardMapper;

        @Cacheable(value = "cards", key = "#pageable.pageNumber + '_' + #pageable.pageSize + '_' + #sortBy")
        public PagedResponse<CardResponse> getAllCards(Pageable pageable, String sortBy) {
                Sort sort = Sort.by(Sort.Direction.ASC, sortBy);
                Page<Card> cards = cardRepository.findAll(PageRequest.of(
                                pageable.getPageNumber(),
                                pageable.getPageSize(),
                                sort));

                List<CardResponse> cardResponses = cards.getContent().stream()
                                .map(cardMapper::toResponse)
                                .collect(Collectors.toList());

                return new PagedResponse<>(
                                cardResponses,
                                cards.getNumber(),
                                cards.getSize(),
                                cards.getTotalElements(),
                                cards.getTotalPages(),
                                cards.isLast());
        }

        @Cacheable(value = "cards", key = "#id")
        public CardResponse getCardById(String id) {
                // Card card = cardRepository.findByCardId(id)
                // .orElseThrow(() -> new ResourceNotFoundException("Card", "id", id));
                // return cardMapper.toResponse(card);
                Card card = cardRepository.findByCardId(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Card", "id", id));
                return cardMapper.toResponse(card);
        }

        @Cacheable(value = "cardsByType", key = "#type + '_' + #pageable.pageNumber")
        public PagedResponse<CardResponse> getCardsByType(String type, Pageable pageable) {
                Page<Card> cards = cardRepository.findAllByType(type, pageable);

                List<CardResponse> cardResponses = cards.getContent().stream()
                                .map(cardMapper::toResponse)
                                .collect(Collectors.toList());

                return new PagedResponse<>(
                                cardResponses,
                                cards.getNumber(),
                                cards.getSize(),
                                cards.getTotalElements(),
                                cards.getTotalPages(),
                                cards.isLast());
        }

}