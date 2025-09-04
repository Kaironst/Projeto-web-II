import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CadastroTable {
  id?: number|null;
  email?: string|null;
  nome?: string|null;
  cpf?: string|null;
  cep?: string|null;
  telefone?: string|null;
  senha?: string|null;  
}

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private requestUrl = "http://localhost:8080/cadastros";
  private http = inject(HttpClient);

  criarCadastro(cadastro: CadastroTable): Observable<CadastroTable> {
    return this.http.post<CadastroTable>(this.requestUrl,cadastro);
  }

  getAllCadastros(): Observable<CadastroTable[]> {
    return this.http.get<CadastroTable[]>(this.requestUrl);
  }

}
