import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailUtil {

  private http = inject(HttpClient);
  private url = "http://localhost:8080/email/api/mailmessage";

  enviarSenha(destino: string, senha: string): Observable<any> {
    return this.http.post(this.url, {
      destino,
      senha
    });
  }
}