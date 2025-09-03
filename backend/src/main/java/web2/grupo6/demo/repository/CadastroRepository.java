package web2.grupo6.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import web2.grupo6.demo.model.Cadastro;

/*
 essa interface essencialmente gera vários métodos que interagem com o banco de dados sem precisar de sql
 ela também possibilita a criação de queries customizadas de forma muito fácil
 */
public interface CadastroRepository extends JpaRepository<Cadastro, Long> {

}
