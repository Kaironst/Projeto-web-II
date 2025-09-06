import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { SolicitacaoManutencao } from '../solicitar_manutencao/solicitar_manutencao';

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

  solicitacao!: SolicitacaoManutencao;
  orcamentoForm!: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const solicitacaoId = Number(this.route.snapshot.paramMap.get('id'));

    const solucoesString = localStorage.getItem('solicitacoes');
    if (solucoesString) {
      const todasSolicitacoes = JSON.parse(solucoesString) as SolicitacaoManutencao[];
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
      
      this.solicitacao.valorOrcado = valor;
      this.solicitacao.status = 'ORÇADA';
      this.solicitacao.dataOrcamento = new Date();
      this.solicitacao.funcionarioOrcamento = 'Funcionario Logado'; 

      const solucoesString = localStorage.getItem('solicitacoes');
      if (solucoesString) {
        let todasSolicitacoes = JSON.parse(solucoesString) as SolicitacaoManutencao[];
        
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