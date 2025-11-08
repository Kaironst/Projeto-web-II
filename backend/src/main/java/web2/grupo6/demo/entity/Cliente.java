package web2.grupo6.demo.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // diz para o jpa que a classe é mapeada para uma tabela do mesmo nome
@Builder
@Data
@AllArgsConstructor // anotações do lombok para geração de getters e setters em todos os métodos e
@NoArgsConstructor // construtor com todos e nenhum argumento
public class Cliente {

  @Id // marca que o elemento é chave primária dentro da tabela gerada
  @GeneratedValue(strategy = GenerationType.IDENTITY) // diz que o valor vai ser gerado pelo própio postgres
  private long id;

  @OneToMany(mappedBy = "cliente")
  private List<Solicitacao> solicitacoes;

  @Column(unique = true)
  private String email;
  private String nome;
  private String cpf;
  private String cep;
  private String telefone;
  private String senha;
}
