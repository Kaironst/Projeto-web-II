import { Injectable } from '@angular/core';

export interface Solicitacao {
  id: number;
  equipamento: string;
  categEquipamento: string; //o ideal é trocar isso aq para um id para a tabela categoria dentro do banco de dados depois
  descDefeito: string;
  dataHora: Date;
  estado: number;

  dataHoraFormatada?: string;
  equipamentoCurto?: string;
  valorOrcamento?: number;
  idCliente?: number;
  idEmpregado?: number;
  funcionarioOrcamento?: string; //:TODO aqui por compatibilidade, tirar quando implementar bd
  cliente?: { // TODO também aqui por compatibilidade
    nome?: string;
    telefone?: string;
    email?: string;
  }
  dataOrcamento?: Date;
}

enum Estado {
  Aberta = 0,
  Orcada = 1,
  Aprovada = 2,
  Rejeitada = 3,
  Arrumada = 4,
  Paga = 5,
  Finalizada = 6
}

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoUtil {
  public estado = Estado;

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

}
