import { Component } from '@angular/core';

interface Solicitacao {
  id: number;
  dataHora: Date;
  equipamento: string;
  estado: string;
  dataHoraFormatada?: string;
  equipamentoCurto?: string;
}

@Component({
  selector: 'app-tela_usuario',
  templateUrl: './tela_usuario.html',
  styleUrl: './tela_usuario.css'
})
export class TelaUsuario {
  solicitacoes: Solicitacao[] = [];

    //inputs temporários, deve pegar do BD
  constructor() {
    this.solicitacoes = [
      { id: 1, dataHora: new Date("2025-08-15T10:30:00"), equipamento: "Impressora Laser HP12345", estado: "ORÇADA" },
      { id: 2, dataHora: new Date("2025-08-16T14:00:00"), equipamento: "Notebook Dell Inspiron 15", estado: "APROVADA" },
      { id: 3, dataHora: new Date("2025-08-17T08:45:00"), equipamento: "Ar Condicionado Split LG", estado: "REJEITADA" },
      { id: 4, dataHora: new Date("2025-08-18T09:10:00"), equipamento: "Projetor Epson X2000", estado: "ARRUMADA" },
      { id: 5, dataHora: new Date("2025-08-19T11:25:00"), equipamento: "Monitor Samsung UltraWide", estado: "EM ANÁLISE" }
    ];

    // Ordena por data/hora crescente
    this.solicitacoes.sort((a, b) => a.dataHora.getTime() - b.dataHora.getTime());

    // Pré-formatar campos
    this.solicitacoes.forEach(s => {
      s.dataHoraFormatada = this.formatarDataHora(s.dataHora);
      s.equipamentoCurto = this.limitarTexto(s.equipamento, 30);
    });
  }

  //formatação de data para dia/mes/ano hora/minuto
  formatarDataHora(data: Date): string {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
  }

  //limita o número de linhas conforme requisitos
  limitarTexto(texto: string, limite: number): string {
    return texto.length > limite ? texto.substring(0, limite) : texto;
  }

  //todo
  visualizar(id: number) { alert(`Visualizar solicitação ${id}`); }
  aprovarRejeitar(id: number) { alert(`Aprovar/Rejeitar solicitação ${id}`); }
  resgatar(id: number) { alert(`Resgatar solicitação ${id}`); }
  pagar(id: number) { alert(`Pagar solicitação ${id}`); }
}