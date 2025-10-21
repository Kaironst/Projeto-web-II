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
import web2.grupo6.demo.entity.Funcionario;

@RestController
@RequestMapping("/api/funcionarios")
@AllArgsConstructor
public class FuncionarioController {

  private final JpaRepository<Funcionario, Long> repo;

  @PostMapping // responde a requisições post
  public Funcionario newFuncionario(@RequestBody Funcionario funcionario) {
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

  @PutMapping("/{id}")
  public Funcionario updateFuncionario(@PathVariable Long id, @RequestBody Funcionario funcionario) {
    Funcionario funcionarioAtual = repo.findById(id).orElseThrow();
    funcionarioAtual.setNome(funcionario.getNome());
    funcionarioAtual.setEmail(funcionario.getEmail());
    funcionarioAtual.setDataNascimento(funcionario.getDataNascimento());
    funcionarioAtual.setAdmin(funcionario.isAdmin());
    return repo.save(funcionarioAtual);
  }

  @DeleteMapping("/{id}")
  public Funcionario deleteFuncionario(@PathVariable Long id) {
    Funcionario funcionarioDeletado = repo.findById(id).orElseThrow();
    repo.deleteById(id);
    return funcionarioDeletado;
  }

}