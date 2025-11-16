package web2.grupo6.demo.controller;

import org.springframework.web.bind.annotation.*;

import web2.grupo6.demo.email.EmailSenhaRequest;
import web2.grupo6.demo.email.EmailService;;

@RestController
@RequestMapping("/email")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/api/teste")
    public String enviarEmailDeTeste(@RequestParam String destino) {
        String corpo = """
                <h2>Envio de e-mail com Spring Boot + Mailjet</h2>
                <p>Serviço de e-mail funcionando</p>
                """;
        emailService.enviarEmail(destino, "Teste de envio de e-mail", corpo);
        return "E-mail enviado para: " + destino;
    }

    @PostMapping("/api/mailmessage")
    public String enviarEmailDeSenha(@RequestBody EmailSenhaRequest req) {
        String corpo = """
            <h2>Bem vindo(a) ao Manutencao de Equipamentos</h2>
            <p>Sua senha foi gerada:</p>
            <h3>%s</h3>
            <p>Ela será usada para acessar sua conta.</p>
            """.formatted(req.senha());
        emailService.enviarEmail(req.destino(), "Senha de Acesso", corpo);
        return "E-mail enviado para: " + req.destino();
    }
}