package web2.grupo6.demo.security;

import org.springframework.boot.security.autoconfigure.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@AllArgsConstructor
public class SecurityConfig {

  @Bean
  public WebSecurityCustomizer webSecurityCustomizer() {
    return (web) -> web.ignoring()
        .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
  }

  // define política de segurança da aplicação
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http, ClienteUserDetailsService userDetailsService,
      JwtService jwtService, PasswordEncoder passwordEncoder) throws Exception {

    JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtService, userDetailsService);

    // cria o authenticationProvider manualmente para evitar loop de injeção
    DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(userDetailsService);
    authenticationProvider.setPasswordEncoder(passwordEncoder);

    return http
        // csrf é um recurso de proteção do spring contra ataques csrf, mas ele não é
        // possível sendo que estamos usando tokens jwt e não uma sessão com cookies
        .csrf(csrf -> csrf.disable())
        // marca quais pontos são abertos para quais usuarios logados ou não. nesse caso
        // ainda falta realizar o login de funcionario, então isso fica mais para testes
        .authorizeHttpRequests(auth -> auth
            .anyRequest().permitAll())
        // faz com que o spring não crie sessões já que cada requisição movimenta o
        // token de autenticação como estamos usando jwt
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        // marca o autenticador usando a bean declarada abaixo
        .authenticationProvider(authenticationProvider)
        // faz com que o jwtAuthenticationFilter rode antes do filtro de autenticação
        // padrão do spring
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
  }

  // valida o login, verifica se o usuario existe e se a senha bate quando os
  // dados são enviados
  @Bean
  public AuthenticationProvider authenticationProvider(ClienteUserDetailsService userDetailsService,
      PasswordEncoder encoder) {
    DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
    provider.setPasswordEncoder(encoder);
    return provider;
  }

  // retorna Authentications validas ou não dependendo da Authentication recebida
  // AuthenticationConfig é um bean fornecido pelo spring que encapsula todos os
  // authenticationProvidersRegistrados
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
    return config.getAuthenticationManager();
  }

  // criptografa senhas antes de guardar no banco e compara senha criptografada
  // com a crua
  @Bean
  public PasswordEncoder passwordEncoder() {
    // sha256+salt customizado para atender aos requisitos
    return new Sha256SaltEncoder();
  }

}
