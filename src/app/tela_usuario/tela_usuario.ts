import { inject, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
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
    MatButtonModule,
    RouterLink
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
    const dadosSalvos = localStorage.getItem('solicitacoes');
    if (dadosSalvos) {
      const solicitacoes = JSON.parse(dadosSalvos) as Solicitacao[];
      this.solicitacoes = solicitacoes.map(s => ({
        ...s,
        dataHora: new Date(s.dataHora),
        dataHoraFormatada: this.solicitacaoUtil.formatarDataHora(new Date(s.dataHora)),
        equipamentoCurto: this.solicitacaoUtil.limitarTexto(s.equipamento, 30)
      }));

      // Ordena por data/hora
      this.solicitacoes.sort((a, b) => a.dataHora.getTime() - b.dataHora.getTime());
    } else {
      this.solicitacoes = [];
    }
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
