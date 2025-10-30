package web2.grupo6.demo.security;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import web2.grupo6.demo.security.dto.LoginRequest;
import web2.grupo6.demo.security.dto.LoginResponse;

@RestController
@RequestMapping("/api/auth/login")
@AllArgsConstructor
public class AuthController {

  private final JwtService jwtService;

  // responde a uma requisição de login do frontend com o token da pessoa
  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request,
      AuthenticationManager authenticationManager) {

    // o autenticador aqui precisa de uma bean de passwordencoder para funcionar,
    // ela sempre checa supondo que a senha no banco é encriptada
    // TODO: Adicionar sha+salt para essa parte funcionar no @bean PasswordEncoder
    Authentication authentication = authenticationManager.authenticate(
        // request.getUsername implicitamente chama a "ClienteUserDetailsService" isso é
        // preocupante para adicionar o login de funcionario
        new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

    // getPrincipal essencialmente retorna UserDetails do usuário autenticado
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();

    // gera o token jwt em si
    String token = jwtService.generateToken(userDetails);

    return ResponseEntity.ok(new LoginResponse(token));

  }
}
