package web2.grupo6.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import web2.grupo6.demo.entity.Funcionario;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

  @Query("select f from Funcionario f where f.email = :email")
  Funcionario findByEmail(@Param("email") String email);

}
