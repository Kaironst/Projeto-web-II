package web2.grupo6.demo.controller;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
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

@RestController // controller que retorna corpo json como se fosse @ResponseBody
@RequestMapping("/api/clientes") // requisições com @PostMapping ou @GetMapping são levadas até essa rota
@AllArgsConstructor
public class ClienteController {

  private final JpaRepository<Cliente, Long> repo;

  @PostMapping // responde a requisições post
  public Cliente newCliente(@RequestBody Cliente cadastro) {
    return repo.save(cadastro);
  }

  @GetMapping
  public List<Cliente> getClientes() {
    return repo.findAll();
  }

  @GetMapping("/{id}")
  public Cliente getCliente(@PathVariable Long id) {
    return repo.findById(id).orElseThrow();
  }

  @PutMapping("/{id}")
  public Cliente updateCliente(@PathVariable Long id, @RequestBody Cliente cliente) {
    Cliente clienteAtual = repo.findById(id).orElseThrow();
    clienteAtual.setNome(cliente.getNome());
    clienteAtual.setEmail(cliente.getEmail());
    clienteAtual.setTelefone(cliente.getTelefone());
    clienteAtual.setSenha(cliente.getSenha());
    clienteAtual.setCpf(cliente.getCpf());
    clienteAtual.setCep(cliente.getCep());
    return repo.save(clienteAtual);
  }

  @DeleteMapping("/{id}")
  public Cliente deleteCliente(@PathVariable Long id) {
    Cliente clienteDeletado = repo.findById(id).orElseThrow();
    repo.deleteById(id);
    return clienteDeletado;
  }

}