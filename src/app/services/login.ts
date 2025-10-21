import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario} from '../shared/models/usuario.model';
import { Login } from '../shared/models/login.model'

const LS_CHAVE: string = "usuarioLogado";


@Injectable({
providedIn: 'root'
})
export class LoginService {

  public get usuarioLogado(): Usuario | null {
    let usu = localStorage[LS_CHAVE];
    return (usu ? JSON.parse(localStorage[LS_CHAVE]) : null);
  }
  
  public set usuarioLogado(usuario: Usuario) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }
  
  logout() {
    delete localStorage[LS_CHAVE];
  }
  login(login: Login): Observable<Usuario | null> {
    let usu = new Usuario(1, login.login,

    login.login, login.senha, "FUNC");

    if (login.login == login.senha) {
      if (login.login == "cliente") {
        usu.perfil = "CLIENTE";
      }
      else if (login.login == "funcionario") {
        usu.perfil = "FUNCIONARIO";
      }
      return of(usu);
    }
    else {
      return of(null);
    }
  }
}