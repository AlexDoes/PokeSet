package com.group.pokeset.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Set;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String email;
    private String password;
    private String name;
    private AuthProvider provider;
    private String providerId;
    private Set<Role> roles;
    private boolean enabled = true;
}