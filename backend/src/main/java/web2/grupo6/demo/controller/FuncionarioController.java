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
import web2.grupo6.demo.entity.Funcionario;
import web2.grupo6.demo.repository.FuncionarioRepository;

@RestController
@RequestMapping("/api/funcionarios")
@AllArgsConstructor
public class FuncionarioController {

  private final FuncionarioRepository repo;
  private final PasswordEncoder passwordEncoder;

  @PostMapping // responde a requisições post
  public Funcionario newFuncionario(@RequestBody Funcionario funcionario) {
    // hash na senha antes de salvar no banco
    funcionario.setSenha(passwordEncoder.encode(funcionario.getSenha()));

    return repo.save(funcionario);
  }

  @GetMapping
  public List<Funcionario> getFuncionarios() {
    return repo.findAll();
  }

  @GetMapping("/{id}")
  public Funcionario getFuncionarios(@PathVariable Long id) {
    return repo.findById(id).orElseThrow();
  }

  @GetMapping("/email/{email}")
  public Funcionario getFuncionarioByEmail(@PathVariable String email) {
    return repo.findByEmailIgnoreCase(email);
  }

  @PutMapping("/{id}")
  public Funcionario updateFuncionario(@PathVariable Long id, @RequestBody Funcionario funcionario) {
    Funcionario funcionarioAtual = repo.findById(id).orElseThrow();
    if (!funcionarioAtual.getSenha().equals(funcionario.getSenha()))
      funcionarioAtual.setSenha(passwordEncoder.encode(funcionario.getSenha()));
    funcionarioAtual.setNome(funcionario.getNome());
    funcionarioAtual.setEmail(funcionario.getEmail());
    funcionarioAtual.setDataNascimento(funcionario.getDataNascimento());
    funcionarioAtual.setAdmin(funcionario.isAdmin());
    funcionarioAtual.setSolicitacoes(funcionario.getSolicitacoes());
    return repo.save(funcionarioAtual);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteFuncionario(@PathVariable Long id) {
    repo.deleteById(id);
    return ResponseEntity.noContent().build();
  }

}
