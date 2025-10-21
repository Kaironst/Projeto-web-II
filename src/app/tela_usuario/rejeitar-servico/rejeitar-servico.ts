import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Solicitacao } from '../../services/DBUtil/solicitacao-util';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rejeitar-servico-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogClose
],
  templateUrl: './rejeitar-servico.html',
  styleUrls: ['./rejeitar-servico.css']
})
export class RejeitarServicoDialog implements OnInit {
  data = inject<{ s: Solicitacao }>(MAT_DIALOG_DATA);
  router = inject(Router);
  dialogRef = inject(MatDialogRef<RejeitarServicoDialog>);

  rejeicaoForm!: FormGroup;

  ngOnInit() {
    this.rejeicaoForm = new FormGroup({
      desc_motivo: new FormControl('', Validators.required)
    });
  }

  confirmarRejeicao() {
    if (this.rejeicaoForm.invalid) {
      alert('Informe o motivo da rejeição.');
      return;
    }

    this.data.s.estado = 4; // REJEITADA
    (this.data.s as any).motivoRejeicao = this.rejeicaoForm.value.desc_motivo;

    this.atualizarSolicitacao(this.data.s);
    alert('Serviço rejeitado com sucesso.');
    this.dialogRef.close();
    this.router.navigate(['/tela_usuario']);
  }

  atualizarSolicitacao(solicitacao: Solicitacao) {
    const lista = JSON.parse(localStorage.getItem('solicitacoes') || '[]') as Solicitacao[];
    const idx = lista.findIndex(s => s.id === solicitacao.id);
    if (idx >= 0) lista[idx] = solicitacao;
    else lista.push(solicitacao);
    localStorage.setItem('solicitacoes', JSON.stringify(lista));
  }

}