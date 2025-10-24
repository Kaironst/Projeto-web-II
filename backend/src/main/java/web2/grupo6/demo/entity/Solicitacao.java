package web2.grupo6.demo.entity;

import java.sql.Date;

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
  private Categoria categEquipamento;

  @ManyToOne
  private Cliente cliente;

  @ManyToOne
  private Funcionario funcionario;

  @ManyToOne
  private Funcionario funcionarioRedirecionado;

  private String equipamento;
  private String descDefeito;
  private Date dataHora;
  private int estado;
  private int valorOrcamento;
  private int dataOrcamento;

  private String descricaoManutencao;
  private String orientacoesCliente;
  private Date dataManutencao;

  private Date dataFechamento;
}
