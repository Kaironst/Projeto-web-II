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
import { Auth } from '../services/autenticacao/auth';
import { Cliente } from '../services/DBUtil/cliente-util';
import { firstValueFrom, take } from 'rxjs';


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
  clienteLogado: Cliente | null = null;

  solicitacaoUtil = inject(SolicitacaoUtil);
  public enum = this.solicitacaoUtil.estado;
  http = inject(HttpClient);
  auth = inject(Auth);

  dialog = inject(MatDialog);
  aprovarServicoDialog = inject(AprovarServico);
  pagarServicoDialog = inject(PagarServico);
  resgatarServicoDialog = inject(ResgatarServico);
  visualizarServicoDialog = inject(VisualizarServico);

  async ngOnInit() {
    this.auth.getClienteAtual().subscribe(cliente => {
      this.clienteLogado = cliente;
      this.carregarSolicitacoes();
    });
  }

  carregarSolicitacoes() {
    this.solicitacaoUtil.getAll().subscribe({
      next: (dados) => {

        const dadosFiltrados = dados.filter(s => s.cliente!.email === this.clienteLogado!.email)

        this.solicitacoes = dadosFiltrados.map(s => ({
          ...s,
          dataHora: new Date(s.dataHora),
          dataHoraFormatada: this.solicitacaoUtil.formatarDataHora(new Date(s.dataHora)),
          equipamentoCurto: this.solicitacaoUtil.limitarTexto(s.equipamento, 30)
        })).sort((a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime());
      },
      error: (erro) => {
        console.error('Erro ao buscar solicitações:', erro);
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

    this.aprovarServicoDialog.openDialog(solicitacao)
      .afterClosed().subscribe(resultado => {
        if (resultado) {
          this.carregarSolicitacoes();
        }
      });
  }

  resgatar(id: number) {
    const solicitacao = this.solicitacoes.find(s => s.id === id);
    if (!solicitacao) return;

    this.resgatarServicoDialog.openDialog(solicitacao)
      .afterClosed().subscribe(resultado => {
        if (resultado === true) {
          this.carregarSolicitacoes();
        }
      });
  }

  pagar(id: number) {
    const solicitacao = this.solicitacoes.find(s => s.id === id);
    if (!solicitacao) return;

    this.pagarServicoDialog.openDialog(solicitacao)
      .afterClosed().subscribe(resultado => {
        if (resultado) {
          this.carregarSolicitacoes();
        }
      });
  }
}
