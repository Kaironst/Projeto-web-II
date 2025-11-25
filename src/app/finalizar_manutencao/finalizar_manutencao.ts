import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Solicitacao, SolicitacaoUtil, Estado } from '../services/DBUtil/solicitacao-util';
import { Funcionario, FuncionarioUtil } from '../services/DBUtil/funcionario-util';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-finalizar-manutencao',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatDividerModule, MatProgressSpinnerModule,
    MatSelectModule
  ],
  templateUrl: './finalizar_manutencao.html',
  styleUrls: ['./finalizar_manutencao.css']
})
export class FinalizarManutencaoComponent implements OnInit {

  solicitacao: Solicitacao | null = null;
  finalizacaoForm: FormGroup;
  mostrarFormFinalizacao = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacaoUtil: SolicitacaoUtil,
    private funcionarioUtil: FuncionarioUtil
  ) {
    this.finalizacaoForm = new FormGroup({
      descricaoFinalizacao: new FormControl('', Validators.required),
      observacoesCliente: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.solicitacaoUtil.get(id).subscribe({
      next: (dados) => {
        this.solicitacao = dados;
      },
      error: () => {
        alert('Solicitação não encontrada.');
      }
    });
  }

  onFinalizarSubmit(): void {
    if (this.finalizacaoForm.invalid || !this.solicitacao?.id) return;

    const dadosFormulario = this.finalizacaoForm.value;
    const solicitacaoAtualizada: Solicitacao = {
      ...this.solicitacao,
      ...dadosFormulario,
      dataFechamento: new Date(),
      estado: Estado.Finalizada
    };

    this.solicitacaoUtil.update(this.solicitacao.id, solicitacaoAtualizada).subscribe({
      next: () => {
        alert('Manutenção finalizada com sucesso!');
        this.router.navigate(['/admin/tela-funcionario']);
      },
      error: () => alert('Erro ao finalizar manutenção.')
    });
  }

  cancelarAcao(): void {
    this.mostrarFormFinalizacao = false;
  }
}