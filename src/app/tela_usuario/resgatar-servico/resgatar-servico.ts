import { inject, Injectable, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Solicitacao, SolicitacaoUtil, Estado } from '../../services/DBUtil/solicitacao-util';

@Injectable({ providedIn: 'root' })
export class ResgatarServico {

  dialog = inject(MatDialog);
  router = inject(Router);
  solicitacaoUtil = inject(SolicitacaoUtil);

  openDialog(solicitacao: Solicitacao): MatDialogRef<ResgatarServicoDialog> {
    return this.dialog.open(ResgatarServicoDialog, { width: '500px', data: { s: solicitacao, }, });
  }

  resgatarSolicitacao(solicitacao: Solicitacao, dialogRef: MatDialogRef<ResgatarServicoDialog>) {
    const solicitacaoAtualizada = { ...solicitacao, estado: Estado.Aberta }; 

    this.solicitacaoUtil.update(solicitacao.id!, solicitacaoAtualizada).subscribe({
      next: () => {
        alert('Resgatado com sucesso. A solicitação voltou para a fila de orçamento.');
        dialogRef.close(true);
      },
      error: (err) => {
        console.error("Erro ao resgatar:", err);
        alert("Falha ao resgatar solicitação.");
        dialogRef.close(false);
      }
    });
  }
}


@Component({
  selector: 'app-resgatar-servico-dialog',
  imports: [MatDialogModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './resgatar-servico.html',
  styleUrl: './resgatar-servico.css'
})
export class ResgatarServicoDialog { data = inject<{ s: Solicitacao }>(MAT_DIALOG_DATA); metodos = inject(ResgatarServico); dialogRef = inject(MatDialogRef<ResgatarServicoDialog>); }