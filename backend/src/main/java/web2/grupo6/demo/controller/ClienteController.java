package web2.grupo6.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import web2.grupo6.demo.entity.Cliente;
import web2.grupo6.demo.repository.ClienteRepository;

@RestController // controller que retorna corpo json como se fosse @ResponseBody
@RequestMapping("/api/clientes") // requisições com @PostMapping ou @GetMapping são levadas até essa rota
@AllArgsConstructor
public class ClienteController {

  private final ClienteRepository repo;
  private final PasswordEncoder passwordEncoder;

  @PostMapping // responde a requisições post
  public Cliente newCliente(@RequestBody Cliente cliente) {
    // hash na senha do cliente
    cliente.setSenha(passwordEncoder.encode(cliente.getSenha()));

    return repo.save(cliente);
  }

  @GetMapping
  public List<Cliente> getClientes() {
    return repo.findAll();
  }

  @GetMapping("/{id}")
  public Cliente getCliente(@PathVariable Long id) {
    return repo.findById(id).orElseThrow();
  }

  @GetMapping("/email/{email}")
  public Cliente getClienteByEmail(@PathVariable String email) {
    return repo.findByEmailIgnoreCase(email);
  }

  @PutMapping("/{id}")
  public Cliente updateCliente(@PathVariable Long id, @RequestBody Cliente cliente) {
    Cliente clienteAtual = repo.findById(id).orElseThrow();
    if (!clienteAtual.getSenha().equals(cliente.getSenha()))
      clienteAtual.setSenha(passwordEncoder.encode(cliente.getSenha()));
    clienteAtual.setNome(cliente.getNome());
    clienteAtual.setEmail(cliente.getEmail());
    clienteAtual.setTelefone(cliente.getTelefone());
    clienteAtual.setSenha(cliente.getSenha());
    clienteAtual.setCpf(cliente.getCpf());
    clienteAtual.setCep(cliente.getCep());
    clienteAtual.setSolicitacoes(cliente.getSolicitacoes());
    return repo.save(clienteAtual);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletCliente(@PathVariable Long id) {
    repo.deleteById(id);
    return ResponseEntity.noContent().build();
  }

}
