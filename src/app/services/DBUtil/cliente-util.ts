import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Cliente {
  id?: number | null;
  email?: string | null;
  nome?: string | null;
  cpf?: string | null;
  cep?: string | null;
  telefone?: string | null;
  senha?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteUtil {

  private requestUrl = "http://localhost:8080/api/clientes";
  private http = inject(HttpClient);

  criarCadastro(cadastro: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.requestUrl, cadastro);
  }

  getAllCadastros(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.requestUrl);
  }

  gerarSenha(): string {
    let intvalue = Math.floor(Math.random() * 10000);
    return intvalue.toString().padStart(4, '0');
  }

}
