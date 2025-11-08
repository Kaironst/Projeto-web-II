package web2.grupo6.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import web2.grupo6.demo.controller.ClienteController;
import web2.grupo6.demo.controller.FuncionarioController;
import web2.grupo6.demo.entity.Cliente;
import web2.grupo6.demo.entity.Funcionario;

@SpringBootApplication
public class ProjetoWeb2Application {

  @Autowired
  ClienteController clienteController;
  @Autowired
  FuncionarioController funcionarioController;

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

    };

  }

}
