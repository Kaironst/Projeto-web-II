import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  //clona o token e continua os filtros com o novo token
  if (auth.isLoggedIn()) {
    return next(req.clone({
      setHeaders: {
        Authorization: `Bearer ${auth.getToken()}`,
      },
    }));
  }

  //continua os interceptors já que não havia um usuário
  return next(req);

}

// serviço simples que essencialmente coloca, remove e acessa o token jwt do login dentro do sistema
@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = "https://localhost8080/api/auth/login";

  http = inject(HttpClient);

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, request).pipe(
      tap((response) => {
        localStorage.setItem("token", response.token);
      })
    );
  }

  logout() {
    localStorage.removeItem("token");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }

}
