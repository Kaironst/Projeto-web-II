import { inject, Injectable, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { Solicitacao, SolicitacaoUtil, Estado } from '../../services/DBUtil/solicitacao-util';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class PagarServico {

  dialog = inject(MatDialog);
  solicitacaoUtil = inject(SolicitacaoUtil);

  openDialog(solicitacao: Solicitacao): MatDialogRef<PagarServicoDialog> {
    return this.dialog.open(PagarServicoDialog, { width: '500px', data: { s: solicitacao } });
  }

  pagarSolicitacao(solicitacao: Solicitacao, dialogRef: MatDialogRef<PagarServicoDialog>) {
    const solicitacaoAtualizada = { ...solicitacao, estado: Estado.Paga };

    this.solicitacaoUtil.update(solicitacao.id!, solicitacaoAtualizada).subscribe({
      next: () => {
        const valorFormatado = solicitacao.valorOrcamento?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        alert(`Pagamento de ${valorFormatado} realizado com sucesso!`);
        dialogRef.close(true);
      },
      error: (err) => {
        console.error('Erro ao pagar solicitação:', err);
        alert('Falha ao processar o pagamento.');
        dialogRef.close(false);
      }
    });
  }
}

@Component({
  selector: 'app-pagar-servico-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, CurrencyPipe, DatePipe, MatDividerModule],
  templateUrl: './pagar-servico.html',
  styleUrl: './pagar-servico.css'
})
export class PagarServicoDialog {
  data = inject<{ s: Solicitacao }>(MAT_DIALOG_DATA);
  metodos = inject(PagarServico);
  dialogRef = inject(MatDialogRef<PagarServicoDialog>);
}