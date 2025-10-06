package web2.grupo6.demo.controller;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

}
