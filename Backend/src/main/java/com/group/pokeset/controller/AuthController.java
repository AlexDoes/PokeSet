package com.group.pokeset.controller;

import com.group.pokeset.payload.ApiResponse;
import com.group.pokeset.payload.AuthResponse;
import com.group.pokeset.payload.LoginRequest;
import com.group.pokeset.payload.SignUpRequest;
import com.group.pokeset.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        try {
            log.debug("Received signup request for email: {}", signUpRequest.getEmail());
            authService.registerUser(signUpRequest);
            return ResponseEntity.ok(new ApiResponse(true, "User registered successfully"));
        } catch (Exception e) {
            log.error("Error during user registration: ", e);
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            log.debug("Received login request for email: {}", loginRequest.getEmail());
            String token = authService.authenticateUser(loginRequest);
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (Exception e) {
            log.error("Error during authentication: ", e);
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, "Invalid email or password"));
        }
    }

    @GetMapping("/user/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            log.debug("Fetching user profile for: {}", userDetails.getUsername());
            return ResponseEntity.ok(authService.getUserProfile());
        } catch (Exception e) {
            log.error("Error fetching user profile: ", e);
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, "Error fetching user profile"));
        }
    }
}