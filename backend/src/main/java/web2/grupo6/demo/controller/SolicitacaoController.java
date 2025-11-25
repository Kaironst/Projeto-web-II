package web2.grupo6.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import web2.grupo6.demo.entity.Solicitacao;
import web2.grupo6.demo.repository.SolicitacaoRepository;

@RestController
@RequestMapping("/api/solicitacoes")
@AllArgsConstructor
public class SolicitacaoController {

  private final SolicitacaoRepository repo;

  @PostMapping
  public Solicitacao newSolicitacao(@RequestBody Solicitacao solicitacao) {
    return repo.save(solicitacao);
  }

  @GetMapping
  public List<Solicitacao> getSolicitacoes() {
    return repo.findAll();
  }

  @GetMapping("/{id}")
  public Solicitacao getSolicitacao(@PathVariable Long id) {
    return repo.findById(id).orElseThrow();
  }

  @GetMapping("/equipamento/{equipamento}")
  public Solicitacao getSolicitacaoByEquipamento(@PathVariable String equipamento) {
    return repo.findByEquipamentoIgnoreCase(equipamento);
  }

  @PutMapping("/{id}")
  public Solicitacao updateSolicitacao(@PathVariable Long id, @RequestBody Solicitacao solicitacao) {
    Solicitacao solicitacaoAtual = repo.findById(id).orElseThrow();
    solicitacaoAtual.setValorOrcamento(solicitacao.getValorOrcamento());
    solicitacaoAtual.setEquipamento(solicitacao.getEquipamento());
    solicitacaoAtual.setDescricaoManutencao(solicitacao.getDescricaoManutencao());
    solicitacaoAtual.setDescDefeito(solicitacao.getDescDefeito());
    solicitacaoAtual.setDataOrcamento(solicitacao.getDataOrcamento());
    solicitacaoAtual.setEstado(solicitacao.getEstado());
    solicitacaoAtual.setFuncionarioRedirecionado(solicitacao.getFuncionarioRedirecionado());
    solicitacaoAtual.setFuncionario(solicitacao.getFuncionario());
    solicitacaoAtual.setOrientacoesCliente(solicitacao.getOrientacoesCliente());
    solicitacaoAtual.setDataManutencao(solicitacao.getDataManutencao());
    solicitacaoAtual.setDataFechamento(solicitacao.getDataFechamento());
    solicitacaoAtual.setDataHora(solicitacao.getDataHora());
    solicitacaoAtual.setCategEquipamento(solicitacao.getCategEquipamento());
    solicitacaoAtual.setCliente(solicitacao.getCliente());
    return repo.save(solicitacaoAtual);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteSolcicitacao(@PathVariable Long id) {
    repo.deleteById(id);
    return ResponseEntity.noContent().build();
  }

}
