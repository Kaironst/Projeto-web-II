import { inject, Injectable, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Solicitacao } from '../../services/DBUtil/solicitacao-util';

@Injectable({ providedIn: 'root' })
export class ResgatarServico {

  dialog = inject(MatDialog);
  router = inject(Router);

  openDialog(solicitacao: Solicitacao) {
    this.dialog.open(ResgatarServicoDialog, { width: '500px', data: { s: solicitacao, }, });
  }

  resgatarSolicitacao(solicitacao: Solicitacao) {
    solicitacao.estado = 2; //APROVADA (volta pro ciclo)
    alert('Resgatado com sucesso. Detalhes foram enviados para o email cadastrado.');

    this.atualizarSolicitacao(solicitacao);
    this.router.navigate(['/tela_usuario']);
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
  selector: 'app-resgatar-servico-dialog',
  imports: [MatDialogModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './resgatar-servico.html',
  styleUrl: './resgatar-servico.css'
})
export class ResgatarServicoDialog { data = inject<{ s: Solicitacao }>(MAT_DIALOG_DATA); metodos = inject(ResgatarServico); }
