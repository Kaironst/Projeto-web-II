package web2.grupo6.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import web2.grupo6.demo.model.Cadastro;
import web2.grupo6.demo.repository.CadastroRepository;

@RestController //controller que retorna corpo json como se fosse @ResponseBody
@RequestMapping("/api/cadastros") //requisições com @PostMapping ou @GetMapping são levadas até essa rota
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class CadastroController {

    private final CadastroRepository repo;

    @PostMapping //responde a requisições post
    public Cadastro novoCadastro(@RequestBody Cadastro cadastro) {
        return repo.save(cadastro);
    }

}

