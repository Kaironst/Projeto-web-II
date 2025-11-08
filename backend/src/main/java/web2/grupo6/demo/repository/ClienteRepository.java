package web2.grupo6.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import web2.grupo6.demo.entity.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

  Cliente findByEmail(String email);

  Cliente findByEmailIgnoreCase(String email);

}
