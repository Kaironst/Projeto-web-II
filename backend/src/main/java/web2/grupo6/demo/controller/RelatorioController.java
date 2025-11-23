package web2.grupo6.demo.controller;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import web2.grupo6.demo.service.RelatorioService;

@RestController
@RequestMapping("/api/relatorios")
@AllArgsConstructor
public class RelatorioController {

    private final RelatorioService relatorioService;

    @GetMapping("/receitas-periodo")
    public ResponseEntity<byte[]> relatorioReceitasPorPeriodo(
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date inicio,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date fim) {
        
        byte[] pdf = relatorioService.gerarRelatorioReceitaPorPeriodo(inicio, fim);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=receitas_periodo.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @GetMapping("/receitas-categoria")
    public ResponseEntity<byte[]> relatorioReceitasPorCategoria() {
        byte[] pdf = relatorioService.gerarRelatorioReceitaPorCategoria();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=receitas_categoria.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}
