import { inject, Injectable, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Solicitacao, SolicitacaoUtil, Estado } from '../../services/DBUtil/solicitacao-util';
import { RejeitarServicoDialog } from '../rejeitar-servico/rejeitar-servico';
import { CurrencyPipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AprovarServico {

  dialog = inject(MatDialog);
  router = inject(Router);
  solicitacaoUtil = inject(SolicitacaoUtil);

  openDialog(solicitacao: Solicitacao){
    return this.dialog.open(AprovarServicoDialog, { width: '500px', data: { s: solicitacao, }, });
  }

  aprovarOrcamento(solicitacao: Solicitacao, dialogRef: MatDialogRef<AprovarServicoDialog>) {
    const solicitacaoAtualizada = { ...solicitacao, estado: Estado.Aprovada };
    this.solicitacaoUtil.update(solicitacao.id!, solicitacaoAtualizada).subscribe({
      next: () => {
        alert(`Serviço aprovado no valor de R$${solicitacao.valorOrcamento ?? '0,00'}`);
        dialogRef.close(true);
      },
      error: (err) => {
        console.error("Erro ao aprovar:", err);
        alert("Falha ao aprovar orçamento.");
        dialogRef.close(false);
      }
    });
  }

  abrirTelaRejeitar(solicitacao: Solicitacao, parentDialogRef: MatDialogRef<AprovarServicoDialog>) {
    const dialogRef = this.dialog.open(RejeitarServicoDialog, { width: '500px', data: { s: solicitacao } });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        parentDialogRef.close(true);
      }
    });
  }

}

@Component({
  selector: 'app-aprovar-servico-dialog',
  imports: [MatDialogModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, CurrencyPipe],
  templateUrl: './aprovar-servico.html',
  styleUrl: './aprovar-servico.css'
})
export class AprovarServicoDialog {
  data = inject<{ s: Solicitacao }>(MAT_DIALOG_DATA);
  metodos = inject(AprovarServico);
  dialogRef = inject(MatDialogRef<AprovarServicoDialog>);
}