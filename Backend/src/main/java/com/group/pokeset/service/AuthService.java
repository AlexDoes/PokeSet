package com.group.pokeset.service;

import com.group.pokeset.model.AuthProvider;
import com.group.pokeset.model.Role;
import com.group.pokeset.model.User;
import com.group.pokeset.payload.*;
import com.group.pokeset.repository.UserRepository;
import com.group.pokeset.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    @Transactional
    public void registerUser(SignUpRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Email address already in use.");
        }

        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setProvider(AuthProvider.LOCAL);
        user.setRoles(Collections.singleton(Role.ROLE_USER));

        userRepository.save(user);
    }

    @Transactional
    public String authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return tokenProvider.generateToken(authentication);
    }

    @Transactional(readOnly = true)
    public UserResponse getUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();
        
        User user = userRepository.findByEmail(currentUserEmail)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new UserResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRoles()
        );
    }
}