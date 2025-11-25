import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  private apiUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  buscarCep(cep: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${cep}/json/`).pipe(
      map(resposta => {
        if (resposta?.erro) {
          return null; // CEP inválido ou não encontrado
        }
        return resposta;
      })
    );
  }
}