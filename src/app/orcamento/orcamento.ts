import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Solicitacao, SolicitacaoUtil } from '../services/DBUtil/solicitacao-util';

@Component({
  selector: 'app-orcamento',
  standalone: true,
  imports: [CommonModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule],
  templateUrl: './orcamento.html',
  styleUrls: ['./orcamento.css']
})
export class OrcamentoComponent implements OnInit {

  orcamento!: Solicitacao;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  solicitacaoUtil = inject(SolicitacaoUtil)

  ngOnInit(): void {
    const solicitacaoId = Number(this.route.snapshot.paramMap.get('id'));
    if (!solicitacaoId) {
      this.router.navigate(['/']);
      return;
    }

    const solucoesString = localStorage.getItem('solicitacoes');
    if (solucoesString) {
      const todasSolicitacoes = JSON.parse(solucoesString) as Solicitacao[];
      const encontrada = todasSolicitacoes.find(s => s.id === solicitacaoId && s.estado === this.solicitacaoUtil.estado.Orcada);

      if (encontrada) {
        this.orcamento = encontrada;
      } else {
        alert('Orçamento não encontrado ou ainda não disponível.');
        this.router.navigate(['/']);
      }
    }
  }

  aprovarServico(): void {
    const valorFormatado = this.orcamento.valorOrcamento!.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    alert(`Serviço Aprovado no Valor ${valorFormatado}`);

    const solucoesString = localStorage.getItem('solicitacoes');
    if (solucoesString) {
      let todasSolicitacoes = JSON.parse(solucoesString) as Solicitacao[];
      let solicitacaoAtualizada = todasSolicitacoes.find(s => s.id === this.orcamento.id);
      if (solicitacaoAtualizada) {
        solicitacaoAtualizada.estado = this.solicitacaoUtil.estado.Aprovada;
        localStorage.setItem('solicitacoes', JSON.stringify(todasSolicitacoes));
      }
    }

    this.router.navigate(['/']);
  }

  rejeitarServico(): void {
    const motivo = prompt('Por favor, escreva o motivo da rejeição:');

    if (motivo !== null) {
      alert('Serviço Rejeitado.');

      const solucoesString = localStorage.getItem('solicitacoes');
      if (solucoesString) {
        let todasSolicitacoes = JSON.parse(solucoesString) as Solicitacao[];
        let solicitacaoAtualizada = todasSolicitacoes.find(s => s.id === this.orcamento.id);
        if (solicitacaoAtualizada) {
          solicitacaoAtualizada.estado = this.solicitacaoUtil.estado.Rejeitada;
          localStorage.setItem('solicitacoes', JSON.stringify(todasSolicitacoes));
        }
      }

      this.router.navigate(['/']);
    }
  }
}
