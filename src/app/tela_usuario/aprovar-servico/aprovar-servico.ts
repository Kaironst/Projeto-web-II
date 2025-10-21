import { inject, Injectable, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Solicitacao } from '../../services/DBUtil/solicitacao-util';
import { RejeitarServicoDialog } from '../rejeitar-servico/rejeitar-servico';

@Injectable({ providedIn: 'root' })
export class AprovarServico {

  dialog = inject(MatDialog);
  router = inject(Router);

  openDialog(solicitacao: Solicitacao) {
    this.dialog.open(AprovarServicoDialog, { width: '500px', data: { s: solicitacao, }, });
  }

  aprovarOrcamento(solicitacao: Solicitacao) {
    solicitacao.estado = 2; //APROVADO
    alert(`Serviço aprovado no valor de R$${solicitacao.valorOrcamento ?? '0,00'}`);
    this.atualizarSolicitacao(solicitacao);
    this.router.navigate(['/tela_usuario']);
  }

  abrirTelaRejeitar(solicitacao: Solicitacao) {
    this.dialog.open(RejeitarServicoDialog, { width: '500px', data: { s: solicitacao } });
  }

  //método ainda tem que ser passado pra um service, vou fazer isso depois ou trocar direto pro back end
  atualizarSolicitacao(solicitacao: Solicitacao) {
    const lista = JSON.parse(localStorage.getItem('solicitacoes') || '[]') as Solicitacao[];
    const idx = lista.findIndex(s => s.id === solicitacao.id);
    if (idx >= 0) lista[idx] = solicitacao;
    else lista.push(solicitacao);
    localStorage.setItem('solicitacoes', JSON.stringify(lista));
  }

}


@Component({
  selector: 'app-aprovar-servico-dialog',
  imports: [MatDialogModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './aprovar-servico.html',
  styleUrl: './aprovar-servico.css'
})
export class AprovarServicoDialog { data = inject<{ s: Solicitacao }>(MAT_DIALOG_DATA); metodos = inject(AprovarServico); }
