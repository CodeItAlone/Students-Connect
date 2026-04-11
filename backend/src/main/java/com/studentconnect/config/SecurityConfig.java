package com.studentconnect.config;

import com.studentconnect.security.JwtFilter;
import com.studentconnect.security.OAuth2SuccessHandler;
import com.studentconnect.security.OAuth2FailureHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@lombok.extern.slf4j.Slf4j
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final OAuth2FailureHandler oAuth2FailureHandler;

    @Value("${CORS_ALLOWED_ORIGINS:http://localhost:3000,https://students-connect.vercel.app}")
    private String allowedOrigins;

    public SecurityConfig(JwtFilter jwtFilter,
                          OAuth2SuccessHandler oAuth2SuccessHandler,
                          OAuth2FailureHandler oAuth2FailureHandler) {
        this.jwtFilter = jwtFilter;
        this.oAuth2SuccessHandler = oAuth2SuccessHandler;
        this.oAuth2FailureHandler = oAuth2FailureHandler;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf(AbstractHttpConfigurer::disable)

            // ✅ CLEAN CORS CONFIG (single source of truth)
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();

                List<String> origins;
                if (allowedOrigins == null || allowedOrigins.trim().isEmpty()) {
                    origins = List.of("http://localhost:3000", "https://students-connect.vercel.app");
                } else {
                    origins = Arrays.stream(allowedOrigins.split(","))
                            .map(String::trim)
                            .filter(s -> !s.isEmpty())
                            .toList();
                }

                log.info("=== CORS ACTIVE WITH ORIGINS: {} ===", origins);

                config.setAllowCredentials(true);
                config.setAllowedOriginPatterns(origins);
                config.setAllowedMethods(Arrays.asList(
                        "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"
                ));
                config.setAllowedHeaders(Arrays.asList("*")); // 🔥 important
                config.setExposedHeaders(Arrays.asList("Authorization"));
                config.setMaxAge(3600L);

                return config;
            }))

            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            .authorizeHttpRequests(auth -> auth
                // ✅ CRITICAL: allow preflight
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                .requestMatchers(
                        "/api/auth/**",
                        "/oauth2/**",
                        "/login/oauth2/**",
                        "/api/stats/**",
                        "/error",
                        "/api/health"
                ).permitAll()

                .anyRequest().authenticated()
            )

            .oauth2Login(oauth2 -> oauth2
                .successHandler(oAuth2SuccessHandler)
                .failureHandler(oAuth2FailureHandler)
            )

            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}