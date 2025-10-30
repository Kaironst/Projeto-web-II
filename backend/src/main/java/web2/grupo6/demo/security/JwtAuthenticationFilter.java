package web2.grupo6.demo.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  private final ClienteUserDetailsService clienteUserDetailsService;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain)
      throws ServletException, IOException {

    String authHeader = request.getHeader("Authorization");

    // remove o prefixo Bearer: (ele é da requisição http feita que indica que é um
    // token jwt e não é utilizado na aplicação)
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
      String token = authHeader.substring(7);

      // lembrando que o username nesse caso é o email
      String username = jwtService.extractUsername(token);

      // caso não haja uma autenticação em efeito no security context holder
      if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

        // carrega os dados de usuário da entidade do banco de dados
        UserDetails userDetails = clienteUserDetailsService.loadUserByUsername(username);

        // caso o token recebido seja válido
        if (jwtService.validateToken(token, userDetails)) {

          // cria um token de autenticação com o usuário e suas permissoes
          UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
              userDetails,
              // aqui seria a senha, mas como o login ja foi validado nesse ponto ele não é
              // necessário
              null,
              userDetails.getAuthorities());
          // coloca detalhes referentes a requisição no token
          authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          // coloca o token de autenticação criado no contexto local do usuário na
          // aplicação
          SecurityContextHolder.getContext().setAuthentication(authToken);
        }

      }

    }

    // continua para o próximo filtro caso não haja token (perdi muito tempo nessa
    // merda pq a porra da requisição parava nessa bosta e a porra do angular me
    // mostrava uma puta tela preta, não sei como não enfiei meu punho na tela do
    // meu pobre pczinho, só milagres 😇😇😇😇😇)
    filterChain.doFilter(request, response);

  }

}
