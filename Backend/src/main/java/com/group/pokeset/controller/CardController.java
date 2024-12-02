package com.group.pokeset.controller;

import com.group.pokeset.payload.CardResponse;
import com.group.pokeset.payload.PagedResponse;
import com.group.pokeset.service.CardService;
// import org.springdoc.core.annotations.ParameterObject;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cards")
@RequiredArgsConstructor
@Validated
@Tag(name = "Card Controller", description = "Endpoints for managing Pokemon cards")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CardController {

    private final CardService cardService;

    @Operation(summary = "Get all cards with pagination and sorting")
    @GetMapping
    public ResponseEntity<PagedResponse<CardResponse>> getCards(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy) {
        return ResponseEntity.ok(cardService.getAllCards(PageRequest.of(page, size), sortBy));
    }

    @Operation(summary = "Get a specific card by ID")
    @GetMapping("/{id}")
    public ResponseEntity<CardResponse> getCardById(@PathVariable String id) {
        return ResponseEntity.ok(cardService.getCardById(id));
    }

    @Operation(summary = "Get cards by type with pagination")
    @GetMapping("/type/{type}")
    public ResponseEntity<PagedResponse<CardResponse>> getCardsByType(
            @PathVariable String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(cardService.getCardsByType(type, PageRequest.of(page, size)));
    }

}