package web2.grupo6.demo.security;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import web2.grupo6.demo.entity.Cliente;
import web2.grupo6.demo.repository.ClienteRepository;

@Service
@AllArgsConstructor
public class ClienteUserDetailsService implements UserDetailsService {

  private final ClienteRepository repo;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    // busca o cliente pelo email
    Cliente probe = new Cliente();
    probe.setEmail(email);
    Example<Cliente> example = Example.of(probe);
    Cliente cliente = repo.findOne(example).orElseThrow(() -> new UsernameNotFoundException("Usuario não encontrado"));

    return new User(
        cliente.getEmail(),
        cliente.getSenha(),
        // "ROLE_" é o prefíxo padrão para permissões que são consideradas cargo.
        // o construtor deve receber uma lista de autoridades do usuário
        List.of(new SimpleGrantedAuthority("ROLE_CLIENTE")));
  }

}
