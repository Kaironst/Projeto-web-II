import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';

export interface Funcionario {
  id: number;
  nome: string;
  email?: string;
  dataNascimento?: Date;
  senha?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FuncionarioUtil {
  
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/funcionarios';
  private loggedInFuncionarioId = 1;

  getFuncionarioLogadoId(): number {
    return this.loggedInFuncionarioId;
  }

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl);
  }

  getFuncionarioPorId(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/${id}`);
  }
  
  criarFuncionario(funcionarioData: Omit<Funcionario, 'id'>): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiUrl, funcionarioData);
  }

  atualizarFuncionario(id: number, funcionarioData: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.apiUrl}/${id}`, funcionarioData);
  }

  removerFuncionario(id: number, funcionariosAtuais: Funcionario[]): Observable<void> {
    if (funcionariosAtuais.length <= 1) {
      return throwError(() => new Error('não é possível remover o único funcionário do sistema.'));
    }
    if (id === this.getFuncionarioLogadoId()) {
      return throwError(() => new Error('não pode remover a si mesmo.'));
    }

    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}