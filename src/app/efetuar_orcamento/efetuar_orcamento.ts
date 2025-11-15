import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Solicitacao, SolicitacaoUtil, Estado } from '../services/DBUtil/solicitacao-util';
import { Funcionario } from '../services/DBUtil/funcionario-util';
import { Auth } from '../services/autenticacao/auth';

@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './efetuar_orcamento.html',
  styleUrls: ['./efetuar_orcamento.css']
})
export class EfetuarOrcamentoComponent implements OnInit {

  solicitacao: Solicitacao | null = null;
  orcamentoForm!: FormGroup;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private solicitacaoUtil = inject(SolicitacaoUtil);
  private auth = inject(Auth);

  //substituir quando RF002 for implementado
  private funcionarioLogado: Funcionario | null = null;

  ngOnInit(): void {
    const solicitacaoId = Number(this.route.snapshot.paramMap.get('id'));
    if (!solicitacaoId) {
      this.router.navigate(['/admin/tela-funcionario']);
      return;
    }

    this.orcamentoForm = new FormGroup({
      valorOrcado: new FormControl(null, [Validators.required, Validators.min(0.01)])
    });

    this.auth.getFuncionarioAtual().subscribe(f => {
      this.funcionarioLogado = f;
      this.solicitacaoUtil.get(solicitacaoId).subscribe({
        next: (dados) => {
          this.solicitacao = dados;
          if (dados.valorOrcamento) {
            this.orcamentoForm.patchValue({ valorOrcado: dados.valorOrcamento });
          }
        },
        error: (err) => {
          console.error('Erro ao buscar solicitação:', err);
          alert('Solicitação não encontrada!');
          this.router.navigate(['/admin/tela-funcionario']);
        }
      });
    });
  }

  onSubmit(): void {
    if (this.orcamentoForm.invalid || !this.solicitacao?.id) {
      return;
    }

    const valor = this.orcamentoForm.value.valorOrcado;

    const solicitacaoAtualizada: Solicitacao = {
      ...this.solicitacao,
      valorOrcamento: valor,
      estado: Estado.Orcada,
      dataOrcamento: new Date(),
      funcionario: this.funcionarioLogado!
    };

    this.solicitacaoUtil.update(this.solicitacao.id, solicitacaoAtualizada).subscribe({
      next: () => {
        alert(`Orçamento de R$ ${valor} registrado com sucesso!`);
        this.router.navigate(['/admin/tela-funcionario']);
      },
      error: (err) => {
        console.error('Erro ao salvar orçamento:', err);
        alert('Falha ao registrar orçamento.');
      }
    });
  }
}
