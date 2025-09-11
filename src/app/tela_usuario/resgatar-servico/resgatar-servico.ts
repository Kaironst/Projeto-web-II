import { inject, Injectable, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { Solicitacao } from '../tela_usuario';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ResgatarServico {

  dialog = inject(MatDialog);
  router = inject(Router);

  openDialog(solicitacao: Solicitacao) {
    this.dialog.open(ResgatarServicoDialog, { width: '500px', data: { s: solicitacao, }, });
  }

  resgatarSolicitacao(solicitacao: Solicitacao) {
    //código de aprovação aqui
    this.router.navigate(['/tela_usuario']);
  }

}


@Component({
  selector: 'app-resgatar-servico-dialog',
  imports: [MatDialogModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './resgatar-servico.html',
  styleUrl: './resgatar-servico.css'
})
export class ResgatarServicoDialog { data = inject<{ s: Solicitacao }>(MAT_DIALOG_DATA); metodos = inject(ResgatarServico); }
