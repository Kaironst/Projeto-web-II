import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  protected requestUrl = "http://localhost:8080/api/funcionarios";

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

  delete(id: number): Observable<Funcionario> {
    return this.http.delete<Funcionario>(`${this.requestUrl}/${id}`);
  }


  //funçoes abaixo existem por motivos de compatibilidade
  //ideal seria trocar elas na implementação pelas padronizadas de cima

  /**
  * @deprecated
  */
  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.requestUrl);
  }

  /**
  * @deprecated
  */
  getFuncionarioPorId(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.requestUrl}/${id}`);
  }

  /**
  * @deprecated
  */
  criarFuncionario(funcionarioData: Omit<Funcionario, 'id'>): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.requestUrl, funcionarioData);
  }

  /**
  * @deprecated
  */
  atualizarFuncionario(id: number, funcionarioData: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.requestUrl}/${id}`, funcionarioData);
  }

  /**
  * @deprecated
  */
  removerFuncionario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.requestUrl}/${id}`);
  }
}
