import { inject, Injectable, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { Solicitacao } from '../tela_usuario';

@Injectable({ providedIn: 'root' })
export class AprovarServico {

  dialog = inject(MatDialog);

  openDialog(solicitacao: Solicitacao) {
    this.dialog.open(AprovarServicoDialog, { width: '500px', data: { s: solicitacao, }, });
  }

}


@Component({
  selector: 'app-aprovar-servico-dialog',
  imports: [MatDialogModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './aprovar-servico.html',
  styleUrl: './aprovar-servico.css'
})
export class AprovarServicoDialog { data = inject<{ s: Solicitacao }>(MAT_DIALOG_DATA) }
