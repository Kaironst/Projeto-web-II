package web2.grupo6.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import web2.grupo6.demo.entity.Categoria;
import web2.grupo6.demo.repository.CategoriaRepository;

@RestController
@RequestMapping("/api/categorias")
@AllArgsConstructor
public class CategoriaController {

  private final CategoriaRepository repo;

  @PostMapping // responde a requisições post
  public Categoria newCategoria(@RequestBody Categoria categoria) {
    return repo.save(categoria);
  }

  @GetMapping
  public List<Categoria> getCategorias() {
    return repo.findAll();
  }

  @GetMapping("/{id}")
  public Categoria getCategoria(@PathVariable Long id) {
    return repo.findById(id).orElseThrow();
  }

  @GetMapping("/nome/{nome}")
  public Categoria getCategoriaByNome(@PathVariable String nome) {
    return repo.findByNomeIgnoreCase(nome);
  }

  @PutMapping("/{id}")
  public Categoria updateCategoria(@PathVariable Long id, @RequestBody Categoria categoria) {
    Categoria categoriaAtual = repo.findById(id).orElseThrow();
    categoriaAtual.setNome(categoria.getNome());
    return repo.save(categoriaAtual);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCategoria(@PathVariable Long id) {
    repo.deleteById(id);
    return ResponseEntity.noContent().build();
  }

}
