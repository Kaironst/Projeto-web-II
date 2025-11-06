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
    // busca pelo cliente
    Cliente probeCliente = new Cliente();
    probeCliente.setEmail(email);
    Example<Cliente> exampleCliente = Example.of(probeCliente);

    // busca pelo funcionario
    Funcionario probeFuncionario = new Funcionario();
    probeFuncionario.setEmail(email);
    Example<Funcionario> exampleFuncionario = Example.of(probeFuncionario);

    // forma o usuário de retorno a partir dos dados da classe encontrada
    User returnUser = clienteRepo.findOne(exampleCliente).map(c -> new User(
        c.getEmail(),
        c.getSenha(),
        List.of(new SimpleGrantedAuthority("ROLE_CLIENTE"))))
        .orElseGet(() -> funcionarioRepo.findOne(exampleFuncionario).map(f -> {
          var roles = List.of(new SimpleGrantedAuthority("ROLE_FUNCIONARIO"));
          if (f.isAdmin())
            roles.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
          return new User(
              f.getEmail(),
              f.getSenha(),
              roles);
        }).orElse(null));

    if (returnUser == null)
      throw new UsernameNotFoundException("usuario não encontrado");
    return returnUser;

  }

}
