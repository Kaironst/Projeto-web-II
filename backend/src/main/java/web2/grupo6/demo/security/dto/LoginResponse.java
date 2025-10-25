package web2.grupo6.demo.security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class LoginResponse {
  @Getter
  private String token;
}
