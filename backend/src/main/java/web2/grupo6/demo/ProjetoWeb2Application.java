package web2.grupo6.demo;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import web2.grupo6.demo.controller.CategoriaController;
import web2.grupo6.demo.controller.ClienteController;
import web2.grupo6.demo.controller.FuncionarioController;
import web2.grupo6.demo.controller.SolicitacaoController;
import web2.grupo6.demo.entity.Categoria;
import web2.grupo6.demo.entity.Cliente;
import web2.grupo6.demo.entity.Funcionario;
import web2.grupo6.demo.entity.Solicitacao;

@SpringBootApplication
public class ProjetoWeb2Application {

  @Autowired
  ClienteController clienteController;
  @Autowired
  FuncionarioController funcionarioController;
  @Autowired
  CategoriaController categoriaController;
  @Autowired
  SolicitacaoController solicitacaoController;

  public static void main(String[] args) {
    SpringApplication.run(ProjetoWeb2Application.class, args);
  }

  @Bean
  CommandLineRunner inserirUsuarios() {

    return (args) -> {

      if (clienteController.getClienteByEmail("cliente@ufpr.br") == null) {
        Cliente c = Cliente.builder()
            .nome("cliente").senha("1234").email("cliente@ufpr.br").cpf("11111111111")
            .telefone("11111111111")
            .cep("12345678").build();
        clienteController.newCliente(c);
      }

      if (funcionarioController.getFuncionarioByEmail("funcionario@ufpr.br") == null) {
        Funcionario f = Funcionario.builder().nome("funcionario").senha("1234")
            .email("funcionario@ufpr.br").admin(false).build();
        funcionarioController.newFuncionario(f);
      }

      if (funcionarioController.getFuncionarioByEmail("admin@ufpr.br") == null) {
        Funcionario f = Funcionario.builder().nome("admin").senha("1234").email("admin@ufpr.br").admin(true).build();
        funcionarioController.newFuncionario(f);
      }

      // usuários de teste dados pelo professor

      // Funcionarios
      var maria = funcionarioController.getFuncionarioByEmail("maria@ufpr.br");
      if (maria == null) {
        maria = Funcionario.builder()
            .nome("maria")
            .senha("1234")
            .admin(true)
            .dataNascimento(LocalDate.of(1990, 10, 25))
            .email("maria@ufpr.br")
            .build();
        funcionarioController.newFuncionario(maria);
      }
      var mario = funcionarioController.getFuncionarioByEmail("mario@ufpr.br");
      if (mario == null) {
        mario = Funcionario.builder()
            .nome("mário")
            .senha("1234")
            .admin(true)
            .dataNascimento(LocalDate.of(1989, 3, 4))
            .email("mario@ufpr.br")
            .build();
        funcionarioController.newFuncionario(mario);
      }

      // Clientes
      var joao = clienteController.getClienteByEmail("joao@ufpr.br");
      if (joao == null) {
        joao = Cliente.builder()
            .nome("joao")
            .senha("1234")
            .telefone("41111111111")
            .cep("83540000")
            .email("joao@ufpr.br")
            .cpf("11111111111")
            .build();
        clienteController.newCliente(joao);
      }
      var jose = clienteController.getClienteByEmail("jose@ufpr.br");
      if (jose == null) {
        jose = Cliente.builder()
            .nome("josé")
            .senha("1234")
            .telefone("41111111111")
            .cep("83540000")
            .email("jose@ufpr.br")
            .cpf("11111111111")
            .build();
        clienteController.newCliente(jose);
      }
      var joana = clienteController.getClienteByEmail("joana@ufpr.br");
      if (joana == null) {
        joana = Cliente.builder()
            .nome("joana")
            .senha("1234")
            .telefone("41111111111")
            .cep("83540000")
            .email("joana@ufpr.br")
            .cpf("11111111111")
            .build();
        clienteController.newCliente(joana);
      }
      var joaquina = clienteController.getClienteByEmail("joaquina@ufpr.br");
      if (joaquina == null) {
        joaquina = Cliente.builder()
            .nome("joaquina")
            .senha("1234")
            .telefone("41111111111")
            .cep("83540000")
            .email("joaquina@ufpr.br")
            .cpf("11111111111")
            .build();
        clienteController.newCliente(joaquina);
      }

      // categorias
      var notebook = categoriaController.getCategoriaByNome("notebook");
      if (notebook == null) {
        notebook = Categoria.builder()
            .nome("notebook")
            .build();
        categoriaController.newCategoria(notebook);
      }
      var desktop = categoriaController.getCategoriaByNome("desktop");
      if (desktop == null) {
        desktop = Categoria.builder()
            .nome("desktop")
            .build();
        categoriaController.newCategoria(desktop);
      }
      var impressora = categoriaController.getCategoriaByNome("impressora");
      if (impressora == null) {
        impressora = Categoria.builder()
            .nome("impressora")
            .build();
        categoriaController.newCategoria(impressora);
      }
      var mouse = categoriaController.getCategoriaByNome("mouse");
      if (mouse == null) {
        mouse = Categoria.builder()
            .nome("mouse")
            .build();
        categoriaController.newCategoria(mouse);
      }
      var teclado = categoriaController.getCategoriaByNome("teclado");
      if (teclado == null) {
        teclado = Categoria.builder()
            .nome("teclado")
            .build();
        categoriaController.newCategoria(teclado);
      }

      // solicitacoes
      if (solicitacaoController.getSolicitacaoByEquipamento("impressora hp 33") == null) {
        var sol = Solicitacao.builder()
            .cliente(joao)
            .estado(0)
            .categEquipamento(impressora)
            .equipamento("impressora hp 33")
            .descDefeito("não aceita cartucho")
            .dataHora(Date.from(LocalDate.of(2025, 10, 30).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("laptop dell inspiron") == null) {
        var sol = Solicitacao.builder()
            .cliente(joana)
            .estado(0)
            .categEquipamento(notebook)
            .equipamento("laptop dell inspiron")
            .descDefeito("fica apitando ao invés de ligar")
            .dataHora(Date.from(LocalDate.of(2025, 10, 29).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("desktop aleatório") == null) {
        var sol = Solicitacao.builder()
            .cliente(jose)
            .estado(0)
            .categEquipamento(desktop)
            .equipamento("desktop aleatório")
            .descDefeito("fonte queimada")
            .dataHora(Date.from(LocalDate.of(2025, 10, 28).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("desktop aleatório") == null) {
        var sol = Solicitacao.builder()
            .cliente(joaquina)
            .estado(0)
            .categEquipamento(desktop)
            .equipamento("desktop aleatório")
            .descDefeito("fonte queimada")
            .dataHora(Date.from(LocalDate.of(2025, 10, 25).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("mouse lugitech") == null) {
        var sol = Solicitacao.builder()
            .cliente(joao)
            .estado(1)
            .categEquipamento(mouse)
            .equipamento("mouse lugitech")
            .descDefeito("cabo arrebentado")
            .dataHora(Date.from(LocalDate.of(2025, 10, 26).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .valorOrcamento(100)
            .dataOrcamento(
                Date.from(LocalDate.of(2025, 10, 27).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .funcionario(maria)
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("teclado não mecanico hp") == null) {
        var sol = Solicitacao.builder()
            .cliente(joao)
            .estado(1)
            .categEquipamento(teclado)
            .equipamento("teclado não mecanico hp")
            .descDefeito("não registra a letra H")
            .dataHora(Date.from(LocalDate.of(2025, 10, 24).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .valorOrcamento(99.99)
            .dataOrcamento(
                Date.from(LocalDate.of(2025, 10, 25).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .funcionario(mario)
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("desktop mediocre") == null) {
        var sol = Solicitacao.builder()
            .cliente(joana)
            .estado(1)
            .categEquipamento(desktop)
            .equipamento("desktop mediocre")
            .descDefeito("processador sofreu combustão espontanea")
            .dataHora(Date.from(LocalDate.of(2025, 10, 24).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .valorOrcamento(535)
            .dataOrcamento(
                Date.from(LocalDate.of(2025, 10, 25).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .funcionario(maria)
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("notebook gamer sem placa de video") == null) {
        var sol = Solicitacao.builder()
            .cliente(jose)
            .estado(2)
            .categEquipamento(notebook)
            .equipamento("notebook gamer sem placa de video")
            .descDefeito("display parou de funcionar do nada")
            .dataHora(Date.from(LocalDate.of(2025, 10, 23).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .valorOrcamento(233.54)
            .dataOrcamento(
                Date.from(LocalDate.of(2025, 10, 24).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .funcionario(mario)
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("impressora \"custo benefício\" ") == null) {
        var sol = Solicitacao.builder()
            .cliente(joaquina)
            .estado(2)
            .categEquipamento(impressora)
            .equipamento("impressora \"custo benefício\" ")
            .descDefeito("tinta acaba automaticamente após a recarga")
            .dataHora(Date.from(LocalDate.of(2025, 10, 23).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .valorOrcamento(300)
            .dataOrcamento(
                Date.from(LocalDate.of(2025, 10, 24).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .funcionario(maria)
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("mouse de bolinha") == null) {
        var sol = Solicitacao.builder()
            .cliente(joao)
            .estado(2)
            .categEquipamento(mouse)
            .equipamento("mouse de bolinha")
            .descDefeito("criou consciencia propia")
            .dataHora(Date.from(LocalDate.of(2025, 10, 23).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .valorOrcamento(666.66)
            .dataOrcamento(
                Date.from(LocalDate.of(2025, 10, 24).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .funcionario(mario)
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("teclado daqueles velho") == null) {
        var sol = Solicitacao.builder()
            .cliente(joana)
            .estado(3)
            .categEquipamento(teclado)
            .equipamento("teclado daqueles velho")
            .descDefeito("está se sentindo solitário")
            .dataHora(Date.from(LocalDate.of(2025, 10, 22).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .valorOrcamento(9999.99)
            .dataOrcamento(
                Date.from(LocalDate.of(2025, 10, 23).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .funcionario(maria)
            .motivoRejeicao("companhia anda muito cara hoje em dia")
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("Desktop de torre moderno") == null) {
        var sol = Solicitacao.builder()
            .cliente(jose)
            .estado(3)
            .categEquipamento(desktop)
            .equipamento("Desktop de torre moderno")
            .descDefeito("memória ram decidiu que não está sendo paga o suficiente e entrou em greve")
            .dataHora(Date.from(LocalDate.of(2025, 10, 23).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .valorOrcamento(900)
            .dataOrcamento(
                Date.from(LocalDate.of(2025, 10, 25).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .funcionario(mario)
            .motivoRejeicao("eu me recuso a aumentar o salário das minhas peças")
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("notebook não tão genérico") == null) {
        var sol = Solicitacao.builder()
            .cliente(joaquina)
            .estado(3)
            .categEquipamento(notebook)
            .equipamento("notebook não tão genérico")
            .descDefeito("todos os componentes quebraram simultaneamente")
            .dataHora(Date.from(LocalDate.of(2025, 10, 20).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .valorOrcamento(5000)
            .dataOrcamento(
                Date.from(LocalDate.of(2025, 10, 25).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .funcionario(maria)
            .motivoRejeicao("compensa mais só comprar um novo")
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("Impressora de qualidade") == null) {
        var sol = Solicitacao.builder()
            .cliente(joao)
            .estado(4)
            .categEquipamento(impressora)
            .equipamento("Impressora de qualidade")
            .descDefeito("papel fica encalhado e trava a impressão")
            .dataHora(Date.from(LocalDate.of(2025, 10, 20).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .valorOrcamento(100)
            .dataOrcamento(
                Date.from(LocalDate.of(2025, 10, 23).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .funcionario(mario)
            .descricaoManutencao("removidos restos de comida que estavam dentro da impressora")
            .orientacoesCliente("não derrube comida em cima de sua impressora")
            .dataManutencao(
                Date.from(LocalDate.of(2025, 10, 25).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("mousesinho rgb gamer") == null) {
        var sol = Solicitacao.builder()
            .cliente(joana)
            .estado(4)
            .categEquipamento(mouse)
            .equipamento("mousesinho rgb gamer")
            .descDefeito("rgb parou de ligar :(")
            .dataHora(Date.from(LocalDate.of(2025, 10, 19).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .valorOrcamento(50)
            .dataOrcamento(
                Date.from(LocalDate.of(2025, 10, 25).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .funcionario(maria)
            .descricaoManutencao("leds foram trocados")
            .orientacoesCliente("nenhum reparo extensivo necessário")
            .dataManutencao(
                Date.from(LocalDate.of(2025, 10, 30).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("tecladosinho rgb gamer") == null) {
        var sol = Solicitacao.builder()
            .cliente(jose)
            .estado(4)
            .categEquipamento(teclado)
            .equipamento("tecladosinho rgb gamer")
            .descDefeito("partido exatamente ao meio")
            .dataHora(Date.from(LocalDate.of(2025, 10, 18).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .valorOrcamento(150)
            .dataOrcamento(
                Date.from(LocalDate.of(2025, 10, 19).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .funcionario(mario)
            .descricaoManutencao("cronomancia avançada usada para restaurar o teclado antes de ele ter quebrado")
            .orientacoesCliente("evite usar o teclado como porrete ao passar raiva em jogos")
            .dataManutencao(
                Date.from(LocalDate.of(2025, 10, 20).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("desktop não importante") == null) {
        var sol = Solicitacao.builder()
            .cliente(joaquina)
            .estado(5)
            .categEquipamento(desktop)
            .equipamento("desktop não importante")
            .descDefeito("ssd corrompido")
            .dataHora(Date.from(LocalDate.of(2025, 10, 19).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .valorOrcamento(150)
            .dataOrcamento(
                Date.from(LocalDate.of(2025, 10, 20).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .funcionario(maria)
            .descricaoManutencao("ssd formatado e restaurado ao funcionamento")
            .orientacoesCliente("disco ainda intacto")
            .dataManutencao(
                Date.from(LocalDate.of(2025, 10, 29).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("laptop thinkpad") == null) {
        var sol = Solicitacao.builder()
            .cliente(joao)
            .estado(5)
            .categEquipamento(notebook)
            .equipamento("laptop thinkpad")
            .descDefeito("thinkpad começou a pensar por si só")
            .dataHora(Date.from(LocalDate.of(2025, 10, 20).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .valorOrcamento(200)
            .dataOrcamento(
                Date.from(LocalDate.of(2025, 10, 22).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .funcionario(mario)
            .descricaoManutencao("troca da bateria CMOS parece ter retornado ele ao normal")
            .orientacoesCliente("contatar caso o problema retorne")
            .dataManutencao(
                Date.from(LocalDate.of(2025, 10, 24).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("mouse wireless sem fio") == null) {
        var sol = Solicitacao.builder()
            .cliente(joana)
            .estado(5)
            .categEquipamento(mouse)
            .equipamento("mouse wireless sem fio")
            .descDefeito("crescimento de fio espontaneo")
            .dataHora(Date.from(LocalDate.of(2025, 10, 15).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .valorOrcamento(100)
            .dataOrcamento(
                Date.from(LocalDate.of(2025, 10, 19).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .funcionario(maria)
            .descricaoManutencao("fio cirurgicamente removido")
            .orientacoesCliente("comportamento wireless restaurado")
            .dataManutencao(
                Date.from(LocalDate.of(2025, 10, 29).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("teclado mecânico") == null) {
        var sol = Solicitacao.builder()
            .cliente(jose)
            .estado(6)
            .categEquipamento(teclado)
            .equipamento("teclado mecânico")
            .descDefeito("várias teclas não funcionam mais")
            .dataHora(Date.from(LocalDate.of(2025, 10, 20).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .valorOrcamento(150)
            .dataOrcamento(
                Date.from(LocalDate.of(2025, 10, 21).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .funcionario(mario)
            .descricaoManutencao("placa do teclado trocada")
            .orientacoesCliente("não derrubar refrigerante no teclado")
            .dataManutencao(
                Date.from(LocalDate.of(2025, 10, 22).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .dataFechamento(
                Date.from(LocalDate.of(2025, 10, 23).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("computador desmontado") == null) {
        var sol = Solicitacao.builder()
            .cliente(joaquina)
            .estado(6)
            .categEquipamento(desktop)
            .equipamento("computador desmontado")
            .descDefeito("computador ainda não foi montado")
            .dataHora(Date.from(LocalDate.of(2025, 10, 20).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .valorOrcamento(50)
            .dataOrcamento(
                Date.from(LocalDate.of(2025, 10, 22).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .funcionario(maria)
            .descricaoManutencao("cumputador montado com sucesso")
            .orientacoesCliente("sem observações")
            .dataManutencao(
                Date.from(LocalDate.of(2025, 10, 24).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .dataFechamento(
                Date.from(LocalDate.of(2025, 10, 30).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .build();
        solicitacaoController.newSolicitacao(sol);
      }
      if (solicitacaoController.getSolicitacaoByEquipamento("notebook sem tela") == null) {
        var sol = Solicitacao.builder()
            .cliente(joao)
            .estado(6)
            .categEquipamento(notebook)
            .equipamento("notebook sem tela")
            .descDefeito("tela caiu fora")
            .dataHora(Date.from(LocalDate.of(2025, 10, 1).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .valorOrcamento(400)
            .dataOrcamento(
                Date.from(LocalDate.of(2025, 10, 2).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .funcionario(mario)
            .descricaoManutencao("tela recolocada")
            .orientacoesCliente("não derrube mais o computador")
            .dataManutencao(
                Date.from(LocalDate.of(2025, 10, 10).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .dataFechamento(
                Date.from(LocalDate.of(2025, 10, 11).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
            .build();
        solicitacaoController.newSolicitacao(sol);
      }

    };

  }

}
