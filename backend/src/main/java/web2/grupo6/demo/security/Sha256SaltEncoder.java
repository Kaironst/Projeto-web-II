package web2.grupo6.demo.security;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;

import org.springframework.security.crypto.password.PasswordEncoder;

public class Sha256SaltEncoder implements PasswordEncoder {

  private final SecureRandom random = new SecureRandom();

  // TODO: implementar essa caralha no bean do password encoder e lembrar de
  // colocar o hash no save do controller de entidade
  @Override
  public String encode(CharSequence rawPassword) {
    // gera salt aleatório
    byte[] salt = new byte[16];
    random.nextBytes(salt);

    // realiza o hash
    try {
      // MessageDigest é uma classe do java que realiza o hashing de tamanho fixo
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      // atualiza o hash padrão com o salt aleatório
      digest.update(salt);
      // realiza o hashing com os chars virando bytes utf8
      byte[] hash = digest.digest(rawPassword.toString().getBytes(StandardCharsets.UTF_8));

      return Base64.getEncoder().encodeToString(salt) + ":" + Base64.getEncoder().encodeToString(hash);

    } catch (Exception e) {
      throw new IllegalStateException();
    }

  }

  @Override
  public boolean matches(CharSequence rawPassword, String encodedPassword) {
    // TODO: Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'matches'");
  }

}
