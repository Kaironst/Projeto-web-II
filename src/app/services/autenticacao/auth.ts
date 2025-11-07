import { HttpClient, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("interceptor Called");
  const auth = inject(Auth);
  let newReq = req;
  //clona o token e continua os filtros com o novo token
  if (auth.isLoggedIn()) {
    newReq = newReq.clone({
      setHeaders: {
        Authorization: `Bearer ${auth.getToken()}`,
      },
    });
  }
  //continua os interceptors já que não havia um usuário
  return next(newReq)
    //checa se o token se tornou inválido
    .pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        console.warn("token inválido ou vencido. Deslogando");
        auth.logout();
      }
      return throwError(() => err);
    }));
}

// serviço simples que essencialmente coloca, remove e acessa o token jwt do login dentro do sistema
@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = "http://localhost:8080/api/auth/login";

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
