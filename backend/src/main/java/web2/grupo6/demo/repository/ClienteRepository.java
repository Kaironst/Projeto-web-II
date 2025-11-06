package web2.grupo6.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import web2.grupo6.demo.entity.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

  @Query("select c from Cliente c where c.email = :email")
  Cliente findByEmail(@Param("email") String email);

}
