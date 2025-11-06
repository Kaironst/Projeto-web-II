package web2.grupo6.demo.entity;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Funcionario {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @OneToMany(mappedBy = "funcionario")
  private List<Solicitacao> solicitacoes;

  @OneToMany(mappedBy = "funcionarioRedirecionado")
  private List<Solicitacao> solicitacoesRecebidas; // fora do ts

  private String email;
  private String senha;
  private String nome;
  private Date dataNascimento;
  private boolean admin;

}
