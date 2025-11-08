import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Solicitacao } from './solicitacao-util';
import { ContatoComBanco } from './contato-com-banco';

export interface Funcionario {
  id: number;
  nome: string;
  email?: string;
  dataNascimento?: Date;
  senha?: string;
  solicitações?: Solicitacao;
  admin?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FuncionarioUtil extends ContatoComBanco {


  protected http = inject(HttpClient);
  protected requestUrl = "http://localhost:8080/api/solicitacoes";
  private loggedInFuncionarioId = 1;

  getFuncionarioLogadoId(): number {
    return this.loggedInFuncionarioId;
  }

  criar(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.requestUrl, funcionario);
  }

  getAll(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.requestUrl);
  }

  getByEmail(email: string): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.requestUrl}/email/${email}`);
  }

  get(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.requestUrl}/${id}`);
  }

  update(id: number, funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.requestUrl}/${id}`, funcionario);
  }

  delete(id: number, funcionariosAtuais?: Funcionario[]): Observable<Funcionario> {
    if (funcionariosAtuais !== undefined && funcionariosAtuais.length <= 1) {
      return throwError(() => new Error('não é possível remover o único funcionário do sistema.'));
    }
    if (id === this.getFuncionarioLogadoId()) {
      return throwError(() => new Error('não pode remover a si mesmo.'));
    }

    return this.http.delete<Funcionario>(`${this.requestUrl}/${id}`);
  }


  //funçoes abaixo existem por motivos de compatibilidade
  //ideal seria trocar elas na implementação pelas padronizadas de cima

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.requestUrl);
  }

  getFuncionarioPorId(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.requestUrl}/${id}`);
  }

  criarFuncionario(funcionarioData: Omit<Funcionario, 'id'>): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.requestUrl, funcionarioData);
  }

  atualizarFuncionario(id: number, funcionarioData: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.requestUrl}/${id}`, funcionarioData);
  }

  removerFuncionario(id: number, funcionariosAtuais: Funcionario[]): Observable<void> {
    if (funcionariosAtuais.length <= 1) {
      return throwError(() => new Error('não é possível remover o único funcionário do sistema.'));
    }
    if (id === this.getFuncionarioLogadoId()) {
      return throwError(() => new Error('não pode remover a si mesmo.'));
    }

    return this.http.delete<void>(`${this.requestUrl}/${id}`);
  }
}
