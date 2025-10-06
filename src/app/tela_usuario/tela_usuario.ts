import { inject, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AprovarServico } from './aprovar-servico/aprovar-servico';
import { PagarServico } from './pagar-servico/pagar-servico';
import { ResgatarServico } from './resgatar-servico/resgatar-servico';
import { VisualizarServico } from './visualizar-servico/visualizar-servico';
import { Solicitacao, SolicitacaoUtil } from '../services/DBUtil/solicitacao-util';


@Component({
  selector: 'app-tela_usuario',
  templateUrl: './tela_usuario.html',
  styleUrl: './tela_usuario.css',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ]
})


export class TelaUsuario implements OnInit {
  solicitacoes: Solicitacao[] = [];

  solicitacaoUtil = inject(SolicitacaoUtil);
  public enum = this.solicitacaoUtil.estado;
  http = inject(HttpClient);
  dialog = inject(MatDialog);
  aprovarServicoDialog = inject(AprovarServico);
  pagarServicoDialog = inject(PagarServico);
  resgatarServicoDialog = inject(ResgatarServico);
  visualizarServicoDialog = inject(VisualizarServico);

  ngOnInit() {
    this.carregarSolicitacoes()
  }

  carregarSolicitacoes() {
    this.http.get<Solicitacao[]>('http://localhost:8080/api/solicitacoes').subscribe(
      {
        next: (dados) => {
          this.solicitacoes = dados.map(s => ( //map ta transformando os objetos vindos do backend em objetos prontos pro frontend
            {
              ...s, //bruxaria do javascript, mas é oq ta funcionando
              //aparentemente é um operador de spread, que insere os dados automatico no objeto
              //que sintaxe horrível de ver...

              dataHora: new Date(s.dataHora),
              dataHoraFormatada: this.solicitacaoUtil.formatarDataHora(
                new Date(s.dataHora)
              ),
              equipamentoCurto: this.solicitacaoUtil.limitarTexto(s.equipamento, 30)
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
              estado: this.enum.Orcada,
              valorOrcamento: 800,
              dataHoraFormatada: this.solicitacaoUtil.formatarDataHora(new Date('2025-09-01T10:30:00')),
              equipamentoCurto: this.solicitacaoUtil.limitarTexto('Impressora LaserJet HP 3050 - Escritório', 30),
              categEquipamento: { nome: 'impressora' },
              descDefeito: 'chip de leitura não aceita cartucho de tinta'
            },
            {
              id: 2,
              dataHora: new Date('2025-09-03T15:45:00'),
              equipamento: 'Notebook Dell Inspiron 15 3000',
              estado: this.enum.Rejeitada,
              valorOrcamento: 300000,
              dataHoraFormatada: this.solicitacaoUtil.formatarDataHora(new Date('2025-09-03T15:45:00')),
              equipamentoCurto: this.solicitacaoUtil.limitarTexto('Notebook Dell Inspiron 15 3000', 30),
              categEquipamento: { nome: 'laptop' },
              descDefeito: 'tela queimada'
            },
            {
              id: 3,
              dataHora: new Date('2025-09-05T09:20:00'),
              equipamento: 'Servidor Dell PowerEdge R730',
              estado: this.enum.Arrumada,
              valorOrcamento: 1649.99,
              dataHoraFormatada: this.solicitacaoUtil.formatarDataHora(new Date('2025-09-05T09:20:00')),
              equipamentoCurto: this.solicitacaoUtil.limitarTexto('Servidor Dell PowerEdge R730', 30),
              categEquipamento: { nome: 'servidor' },
              descDefeito: 'fonte queimada'
            }
          ];

          console.log(this.solicitacoes);

          this.solicitacoes.sort((a, b) => a.dataHora.getTime() - b.dataHora.getTime());

        }
      });
  }

  //ações
  visualizar(id: number) {
    const solicitacao = this.solicitacoes.find(s => s.id === id);
    if (!solicitacao) return;
    this.visualizarServicoDialog.openDialog(solicitacao);
  }

  aprovarRejeitar(id: number) {
    const solicitacao = this.solicitacoes.find(s => s.id === id);
    if (!solicitacao) return;
    this.aprovarServicoDialog.openDialog(solicitacao);
  }

  resgatar(id: number) {
    const solicitacao = this.solicitacoes.find(s => s.id === id);
    if (!solicitacao) return;
    this.resgatarServicoDialog.openDialog(solicitacao);
  }

  pagar(id: number) {
    const solicitacao = this.solicitacoes.find(s => s.id === id);
    if (!solicitacao) return;
    this.pagarServicoDialog.openDialog(solicitacao);
  }
}
