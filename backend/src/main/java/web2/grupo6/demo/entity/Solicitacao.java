package web2.grupo6.demo.entity ;

import java.sql.Date;

import org.springframework.data.annotation.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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

  // private CategoriaEquipamento categEquipamento;
  @ManyToOne
  private Cliente cliente;
  // private Funcionario funcionario;

  private String equipamento;
  private String descDefeito;
  private Date dataHora;
  private int estado;
  private int valorOrcamento;
  private int dataOrcamento;

}
