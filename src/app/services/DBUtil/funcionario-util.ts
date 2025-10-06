import { Injectable } from '@angular/core';
import { Solicitacao } from './solicitacao-util';

export interface Funcionario {
  id?: number | null;
  email?: string;
  nome?: string;
  dataNascimento?: Date;
  solicitações?: Solicitacao;
}

@Injectable({
  providedIn: 'root'
})
export class FuncionarioUtil {

}
