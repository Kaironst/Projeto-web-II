package web2.grupo6.demo.entity;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties; 

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Solicitacao {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @ManyToOne
  @JsonIgnoreProperties("solicitacoes")
  private Categoria categEquipamento;

  @ManyToOne
  @JsonIgnoreProperties("solicitacoes")
  private Cliente cliente;

  @ManyToOne
  @JsonIgnoreProperties("solicitacoes")
  private Funcionario funcionario;

  @ManyToOne
  @JsonIgnoreProperties("solicitacoes")
  private Funcionario funcionarioRedirecionado;

  private String equipamento;
  private String descDefeito;
  private Date dataHora;
  private int estado;
  private double valorOrcamento;
  private Date dataOrcamento;

  private String descricaoManutencao;
  private String orientacoesCliente;
  private Date dataManutencao;

  private Date dataFechamento;

  private String motivoRejeicao;  
}
