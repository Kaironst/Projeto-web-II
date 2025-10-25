package web2.grupo6.demo.security.dto;

import lombok.Data;

@Data
public class LoginRequest {
  private String username;
  private String password;
}
