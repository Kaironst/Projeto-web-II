package web2.grupo6.demo.controller;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import web2.grupo6.demo.entity.Categoria;

@RestController
@RequestMapping("/api/categorias")
@AllArgsConstructor
public class CategoriaController {

  private final JpaRepository<Categoria, Long> repo;

  @PostMapping // responde a requisições post
  public Categoria newCategoria(@RequestBody Categoria categoria) {
    return repo.save(categoria);
  }

  @GetMapping
  public List<Categoria> getCategorias() {
    return repo.findAll();
  }

}
