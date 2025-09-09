import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { VisualizarDialogComponent } from '../visualizar_solicitacao/visualizar_solicitacao';



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
  styleUrl: './tela_usuario.css',
  imports:[
    MatDialogModule,
    MatButtonModule
  ]
})


export class TelaUsuario{
  solicitacoes: Solicitacao[] = [];

    //Pega dados do backend por http, mudar depois o link pro link definitivo

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.carregarSolicitacoes();
  }

carregarSolicitacoes(){
  this.http.get<Solicitacao[]>('http://localhost:8080/api/solicitacoes').subscribe(
  {
    next: (dados) =>{
      this.solicitacoes = dados.map(s => ( //map ta transformando os objetos vindos do backend em objetos prontos pro frontend
        {
            ...s, //bruxaria do javascript, mas é oq ta funcionando
                  //aparentemente é um operador de spread, que insere os dados automatico no objeto
                  //que sintaxe horrível de ver...

            dataHora: new Date(s.dataHora),
            dataHoraFormatada: this.formatarDataHora(
              new Date(s.dataHora)
            ),
            equipamentoCurto: this.limitarTexto(s.equipamento, 30)
          }));

          // ordena por data/hora
          this.solicitacoes.sort((a, b) => a.dataHora.getTime() - b.dataHora.getTime());
        },
        error: (erro) => {
          console.error('Erro ao buscar solicitações:', erro);
          
          //falha de conexão, utilizando dados de teste
          this.solicitacoes = [
            {
              id: 1,
              dataHora: new Date('2025-09-01T10:30:00'),
              equipamento: 'Impressora LaserJet HP 3050 - Escritório',
              estado: 'ORÇADA',
              dataHoraFormatada: this.formatarDataHora(new Date('2025-09-01T10:30:00')),
              equipamentoCurto: this.limitarTexto('Impressora LaserJet HP 3050 - Escritório', 30)
            },
            {
              id: 2,
              dataHora: new Date('2025-09-03T15:45:00'),
              equipamento: 'Notebook Dell Inspiron 15 3000',
              estado: 'REJEITADA',
              dataHoraFormatada: this.formatarDataHora(new Date('2025-09-03T15:45:00')),
              equipamentoCurto: this.limitarTexto('Notebook Dell Inspiron 15 3000', 30)
            },
            {
              id: 3,
              dataHora: new Date('2025-09-05T09:20:00'),
              equipamento: 'Servidor Dell PowerEdge R730',
              estado: 'ARRUMADA',
              dataHoraFormatada: this.formatarDataHora(new Date('2025-09-05T09:20:00')),
              equipamentoCurto: this.limitarTexto('Servidor Dell PowerEdge R730', 30)
            }
          ];

          this.solicitacoes.sort((a, b) => a.dataHora.getTime() - b.dataHora.getTime());

        }
      });
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



//ações
visualizar(id: number) {
  const solicitacao = this.solicitacoes.find(s => s.id === id);
  if (!solicitacao) return;
  this.dialog.open(VisualizarDialogComponent, {
    width: '400px',
    data: solicitacao
  })
}

aprovarRejeitar(id: number) {
  this.http.post(`http://localhost:8080/api/solicitacoes/${id}/aprovar-rejeitar`, {}) //mudar link para o definitivo depois
    .subscribe({
      next: () => {
        alert(`Solicitação ${id} foi aprovada/rejeitada.`);
        this.carregarSolicitacoes(); // recarrega lista após ação
      },
      error: (erro) => {
        console.error(erro);
        alert(`Erro ao aprovar/rejeitar solicitação ${id}`);
      }
    });
}

resgatar(id: number) {
  this.http.post(`http://localhost:8080/api/solicitacoes/${id}/resgatar`, {}) //mudar link para o definitivo depois
    .subscribe({
      next: () => {
        alert(`Solicitação ${id} foi resgatada.`);
        this.carregarSolicitacoes(); // recarrega lista após ação
      },
      error: (erro) => {
        console.error(erro);
        alert(`Erro ao resgatar solicitação ${id}`);
      }
    });
}

pagar(id: number) {
  this.http.post(`http://localhost:8080/api/solicitacoes/${id}/pagar`, {}) //mudar link para o definitivo depois
    .subscribe({
      next: () => {
        alert(`Solicitação ${id} foi paga com sucesso.`);
        this.carregarSolicitacoes(); // recarrega lista após ação
      },
      error: (erro) => {
        console.error(erro);
        alert(`Erro ao pagar solicitação ${id}`);
      }
    }
  );
}
}