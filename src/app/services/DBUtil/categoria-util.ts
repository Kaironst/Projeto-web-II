import { Injectable } from '@angular/core';

export interface Categoria {
  id?: number;
  nome?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaUtil {
  //eu sei que não tem nada aqui ainda, mas o propósito de separar as interfaces dentro
  //de seu service própio é para facilitar a conexão com o banco de dados
}
