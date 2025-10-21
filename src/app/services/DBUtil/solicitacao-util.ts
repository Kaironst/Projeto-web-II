import { inject, Injectable } from '@angular/core';
import { Cliente } from './cliente-util';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categoria } from './categoria-util';
import { Funcionario } from './funcionario-util';
import { ContatoComBanco } from './contato-com-banco';

export interface Solicitacao {
  id?: number;
  equipamento: string;

  categEquipamento?: Categoria;

  descDefeito: string;
  dataHora: Date;
  estado: number;

  //esses valores são utilitários apenas
  dataHoraFormatada?: string;
  equipamentoCurto?: string;

  valorOrcamento?: number;
  cliente?: Cliente;
  funcionario?: Funcionario;
  funcionarioRedirecionado?: Funcionario | null;
  dataOrcamento?: Date;

  descricaoManutencao?: string;
  orientacoesCliente?: string;
  dataManutencao?: Date;

  dataFechamento?: Date;

  motivoRejeicao?: string;
}

export enum Estado {
  Aberta = 0,
  Orcada = 1,
  Aprovada = 2,
  Rejeitada = 3,
  Arrumada = 4,
  Paga = 5,
  Finalizada = 6,
  Redirecionada = 7
}

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoUtil extends ContatoComBanco {

  public estado = Estado;
  protected http = inject(HttpClient);
  protected requestUrl = "https://localhost:8080/api/solicitacoes";

  criar(solicitacao: Solicitacao): Observable<Solicitacao> {
    return this.http.post<Solicitacao>(this.requestUrl, solicitacao);
  }

  getAll(): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(this.requestUrl);
  }

  get(id: number): Observable<Solicitacao> {
    return this.http.get<Solicitacao>(`${this.requestUrl}/${id}`);
  }

  update(id: number, solicitacao: Solicitacao): Observable<Solicitacao> {
    return this.http.put<Solicitacao>(`${this.requestUrl}/${id}`, solicitacao);
  }

  delete(id: number): Observable<Solicitacao> {
    return this.http.delete<Solicitacao>(`${this.requestUrl}/${id}`);
  }

  //retorna a representação do valor do enum em string
  nomeEstado(estado: number): string {
    switch (estado) {
      case Estado.Aberta: return "Aberta";
      case Estado.Orcada: return "Orcada";
      case Estado.Aprovada: return "Aprovada";
      case Estado.Rejeitada: return "Rejeitada";
      case Estado.Arrumada: return "Arrumada";
      case Estado.Paga: return "Paga";
      case Estado.Finalizada: return "Finalizada";
      case Estado.Redirecionada: return "Redirecionada";
      default: return "caso desconhecido";
    }
  }

  //formatação de data para dia/mes/ano hora/minuto
  //já que o padrão não vem assim
  formatarDataHora(data: Date): string {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
  }

  //limita o número de caracteres conforme requisitos
  limitarTexto(texto: string, limite: number): string {
    return texto.length > limite ? texto.substring(0, limite) : texto;
  }


  //também por compatibilidade, ideal é trocar a implementação pelas de cima
  getSolicitacaoPorId(id: number): Observable<Solicitacao> {
    const url = `${this.requestUrl}/${id}`;
    return this.http.get<Solicitacao>(url);
  }

  atualizarSolicitacao(id: number, solicitacao: Solicitacao): Observable<Solicitacao> {
    const url = `${this.requestUrl}/${id}`;
    return this.http.put<Solicitacao>(url, solicitacao);
  }

  atualizarStatus(id: number, novoStatus: number): Observable<Solicitacao> {
    const url = `${this.requestUrl}/${id}/atualizar-status`;
    return this.http.patch<Solicitacao>(url, { estado: novoStatus });
  }

}
