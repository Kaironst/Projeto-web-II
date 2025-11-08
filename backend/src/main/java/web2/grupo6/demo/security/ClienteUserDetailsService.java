package web2.grupo6.demo.security;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import web2.grupo6.demo.entity.Cliente;
import web2.grupo6.demo.entity.Funcionario;
import web2.grupo6.demo.repository.ClienteRepository;
import web2.grupo6.demo.repository.FuncionarioRepository;

@Service
@AllArgsConstructor
public class ClienteUserDetailsService implements UserDetailsService {

  private final ClienteRepository clienteRepo;
  private final FuncionarioRepository funcionarioRepo;

  // cria um objeto de usuário para uso do spring security com os roles baseados
  // na classe de escolha
  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

    UserDetails returnUser = null;

    Cliente cliente = clienteRepo.findByEmailIgnoreCase(email);
    if (cliente != null) {
      var roles = List.of(new SimpleGrantedAuthority("ROLE_CLIENTE"));
      returnUser = new User(
          cliente.getEmail(),
          cliente.getSenha(),
          roles);
      return returnUser;
    }
    Funcionario funcionario = funcionarioRepo.findByEmailIgnoreCase(email);
    if (funcionario != null) {
      var roles = List.of(new SimpleGrantedAuthority("ROLE_FUNCIONARIO"));
      if (funcionario.isAdmin())
        roles.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
      returnUser = new User(
          funcionario.getEmail(),
          funcionario.getSenha(),
          roles);
      return returnUser;
    }

    System.out.println("usuario não encontrado");
    throw new UsernameNotFoundException("usuario não encontrado");

  }

}
