package web2.grupo6.demo.controller;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import web2.grupo6.demo.entity .Solicitacao;

@RestController
@RequestMapping("/api/solicitacoes")
@AllArgsConstructor
public class SolicitacaoController {

  private final JpaRepository<Solicitacao, Long> repo;

  @PostMapping
  Solicitacao newSolicitacao(Solicitacao solicitacao) {
    return repo.save(solicitacao);
  }

  @GetMapping
  List<Solicitacao> getSolicitacoes() {
    return repo.findAll();
  }

}
