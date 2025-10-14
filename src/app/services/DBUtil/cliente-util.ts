import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContatoComBanco } from './contato-com-banco';
import { sha256 } from 'js-sha256';

export interface Cliente {
  id?: number | null;
  email?: string | null;
  nome?: string | null;
  cpf?: string | null;
  cep?: string | null;
  telefone?: string | null;
  senha?: string | null;
  salt?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteUtil extends ContatoComBanco {

  private requestUrl = "http://localhost:8080/api/clientes";
  private http = inject(HttpClient);

  criar(cadastro: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.requestUrl, cadastro);
  }

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.requestUrl);
  }

  get(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.requestUrl}/${id}`)
  }

  update(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.requestUrl}/${id}`, cliente);
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.requestUrl}/${id}`);
  }

  gerarSenha(): string { //nao sei oque fazer com isso, porque que o usuario não faz sua própria senha?
    let intvalue = Math.floor(Math.random() * 10000);
    return intvalue.toString().padStart(4, '0');
  }

  //validações de senha com HASH e SALT
  senhaValida(input: string, cliente: Cliente): boolean {
    if (!cliente.senha || !cliente.salt) return false;
    const hashTentativa = sha256(input + cliente.salt);
    return hashTentativa === cliente.senha;
  }
  gerarSalt(): string {
    return crypto.getRandomValues(new Uint8Array(16))
      .reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '');
  }

  gerarHashSenha(senha: string, salt: string): string {
    return sha256(senha + salt);
  }
}
