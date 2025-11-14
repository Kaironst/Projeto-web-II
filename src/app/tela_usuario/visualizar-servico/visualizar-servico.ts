import { inject, Injectable, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Solicitacao, SolicitacaoUtil } from '../../services/DBUtil/solicitacao-util';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class VisualizarServico {

  dialog = inject(MatDialog);
  router = inject(Router);
  solicitacaoUtil = inject(SolicitacaoUtil)
  openDialog(solicitacao: Solicitacao) {
    this.dialog.open(VisualizarServicoDialog, { width: '500px', data: { s: solicitacao, }, });
  }

}


@Component({
  selector: 'app-visualizar-servico-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, DatePipe, CurrencyPipe],
  templateUrl: './visualizar-servico.html',
  styleUrl: './visualizar-servico.css'
})
export class VisualizarServicoDialog { 
  data = inject<{ s: Solicitacao }>(MAT_DIALOG_DATA); 
  metodos = inject(VisualizarServico); 
}

