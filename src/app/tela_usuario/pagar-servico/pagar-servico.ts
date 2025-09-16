import { inject, Injectable, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Solicitacao } from '../../services/DBUtil/solicitacao-util';

@Injectable({ providedIn: 'root' })
export class PagarServico {

  dialog = inject(MatDialog);
  router = inject(Router);

  openDialog(solicitacao: Solicitacao) {
    this.dialog.open(PagarServicoDialog, { width: '500px', data: { s: solicitacao, }, });
  }

  pagarSolicitacao(solicitacao: Solicitacao) {
    //código de aprovação aqui
    this.router.navigate(['/tela_usuario']);
  }

}


@Component({
  selector: 'app-pagar-servico-dialog',
  imports: [MatDialogModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './pagar-servico.html',
  styleUrl: './pagar-servico.css'
})
export class PagarServicoDialog { data = inject<{ s: Solicitacao }>(MAT_DIALOG_DATA); metodos = inject(PagarServico); }
