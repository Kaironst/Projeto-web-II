package web2.grupo6.demo.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.mail.from:manutencaoequipamentos3@gmail.com}")
    private String remetentePadrao;

    public void enviarEmail(String destinatario, String assunto, String conteudoHtml) {
        try {
            MimeMessage mensagem = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensagem, true, "UTF-8");

            helper.setTo(destinatario);
            helper.setSubject(assunto);
            helper.setText(conteudoHtml, true); // true pra enviar texto com formatacao HTML
            helper.setFrom(remetentePadrao);

            mailSender.send(mensagem);
            System.out.println("E-mail enviado para " + destinatario);
        } catch (MessagingException e) {
            e.printStackTrace();
            System.err.println("Erro ao enviar e-mail: " + e.getMessage());
        }
    }
}
