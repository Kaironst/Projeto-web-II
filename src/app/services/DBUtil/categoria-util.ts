import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContatoComBanco } from './contato-com-banco';

export interface Categoria {
  id?: number;
  nome?: string;
}


@Injectable({
  providedIn: 'root'
})
export class CategoriaUtil extends ContatoComBanco {

  private requestUrl = "http://localhost:8080/api/categorias";
  private http = inject(HttpClient);

  criar(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.requestUrl, categoria)
  }

  getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.requestUrl);
  }

  get(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.requestUrl}/${id}`);
  }

  update(id: number, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.requestUrl}/${id}`, categoria);
  }

  delete(id: number): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.requestUrl}/${id}`);
  }

}
