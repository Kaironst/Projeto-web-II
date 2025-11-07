package web2.grupo6.demo.security;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

  @Value("${jwt.secret}")
  private String key;

  String generateToken(UserDetails userDetails) {

    String username = userDetails.getUsername();

    // Hashmap que contém as permissões do usuário a entrar no token
    // tudo isso serve para não ter que fazer query no backend toda vez que queremos
    // checar permissão
    List<String> roles = userDetails.getAuthorities()
        .stream()
        .map(GrantedAuthority::getAuthority)
        .collect(Collectors.toList());

    Date dataAtual = new Date();
    Date dataVencimento = new Date(dataAtual.getTime() + 1000 * 60 * 60 * 10);

    // retorna o token (string)
    return Jwts.builder()
        .subject(username)
        .claim("roles", roles)
        .issuedAt(dataAtual)
        .expiration(dataVencimento)
        .signWith(Keys.hmacShaKeyFor(key.getBytes()))
        .compact();
  }

  boolean validateToken(String token, UserDetails userDetails) {

    // verifica o token usando a chave e pega os Claims dele
    Jws<Claims> jws = Jwts.parser()
        .verifyWith(Keys.hmacShaKeyFor(key.getBytes()))
        .build()
        .parseSignedClaims(token);

    // pegaa o usuario e data de expiração do payload de dados do token
    var payload = jws.getPayload();
    String username = payload.getSubject();
    Date dataVencimento = payload.getExpiration();

    return username.equals(userDetails.getUsername()) && dataVencimento.after(new Date());

  }

  String extractUsername(String token) {
    return Jwts.parser()
        .verifyWith(Keys.hmacShaKeyFor(key.getBytes()))
        .build()
        .parseSignedClaims(token)
        .getPayload()
        .getSubject();
  }

}
