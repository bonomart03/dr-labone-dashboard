package com.drlabone.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 1. Desactivamos CSRF (necesario cuando React y Spring Boot están en puertos distintos)
            .csrf(csrf -> csrf.disable())
            
            // 2. Habilitamos CORS para que React no sea bloqueado por políticas de origen cruzado
            .cors(Customizer.withDefaults())
            
            // 3. Definimos las reglas de autorización
            .authorizeHttpRequests(auth -> auth
                // Dejamos pasar libremente las peticiones OPTIONS (las hace el navegador por seguridad antes de un POST)
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                // PERMITIMOS a cualquiera hacer peticiones GET (para que la página web funcione para los visitantes)
                .requestMatchers(HttpMethod.GET, "/api/**").permitAll()
                // BLOQUEAMOS cualquier otra petición (POST, PUT, DELETE). Requieren contraseña.
                .anyRequest().authenticated()
            )
            
            // 4. Activamos la autenticación básica (usuario y contraseña por encabezado HTTP)
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    // 5. Creamos un usuario "Hardcodeado" en memoria para el administrador
    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails admin = User.builder()
            .username("drlabone")
            .password("{noop}multiverso2026") // {noop} le dice a Spring que la contraseña no está encriptada por ahora
            .roles("ADMIN")
            .build();

        return new InMemoryUserDetailsManager(admin);
    }
}