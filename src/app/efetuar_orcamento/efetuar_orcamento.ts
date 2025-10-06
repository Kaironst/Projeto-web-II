import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Solicitacao, SolicitacaoUtil } from '../services/DBUtil/solicitacao-util';

@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule],
  templateUrl: './efetuar_orcamento.html',
  styleUrls: ['./efetuar_orcamento.css']
})
export class EfetuarOrcamentoComponent implements OnInit {

  solicitacao!: Solicitacao;
  orcamentoForm!: FormGroup;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  solicitacaoUtil = inject(SolicitacaoUtil);

  ngOnInit(): void {
    const solicitacaoId = Number(this.route.snapshot.paramMap.get('id'));

    const solucoesString = localStorage.getItem('solicitacoes');
    if (solucoesString) {
      const todasSolicitacoes = JSON.parse(solucoesString) as Solicitacao[];
      const encontrada = todasSolicitacoes.find(s => s.id === solicitacaoId);
      if (encontrada) {
        this.solicitacao = encontrada;
      } else {
        alert('Solicitação não encontrada!');
        this.router.navigate(['/']);
      }
    }

    this.orcamentoForm = new FormGroup({
      valorOrcado: new FormControl(null, [Validators.required, Validators.min(0.01)])
    });
  }

  onSubmit(): void {
    if (this.orcamentoForm.valid && this.solicitacao) {
      const valor = this.orcamentoForm.value.valorOrcado;

      this.solicitacao.valorOrcamento = valor;
      this.solicitacao.estado = this.solicitacaoUtil.estado.Orcada;
      this.solicitacao.dataOrcamento = new Date();
      if (this.solicitacao.funcionario != null)
        this.solicitacao.funcionario.nome = 'Funcionario Logado';

      const solucoesString = localStorage.getItem('solicitacoes');
      if (solucoesString) {
        let todasSolicitacoes = JSON.parse(solucoesString) as Solicitacao[];

        const index = todasSolicitacoes.findIndex(s => s.id === this.solicitacao.id);
        if (index !== -1) {
          todasSolicitacoes[index] = this.solicitacao;
          localStorage.setItem('solicitacoes', JSON.stringify(todasSolicitacoes));

          alert(`Orçamento de R$ ${valor} registrado com sucesso!`);
          this.router.navigate(['/']);
        }
      }
    }
  }
}
