import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitacaoManutencao } from '../solicitar_manutencao/solicitar_manutencao';

@Component({
  selector: 'app-orcamento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orcamento.html',
  styleUrls: ['./orcamento.css']
})
export class OrcamentoComponent implements OnInit {
  
  orcamento!: SolicitacaoManutencao;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const solicitacaoId = Number(this.route.snapshot.paramMap.get('id'));
    if (!solicitacaoId) {
      this.router.navigate(['/']);
      return;
    }

    const solucoesString = localStorage.getItem('solicitacoes');
    if (solucoesString) {
      const todasSolicitacoes = JSON.parse(solucoesString) as SolicitacaoManutencao[];
      const encontrada = todasSolicitacoes.find(s => s.id === solicitacaoId && s.status === 'ORÇADA');
      
      if (encontrada) {
        this.orcamento = encontrada;
      } else {
        alert('Orçamento não encontrado ou ainda não disponível.');
        this.router.navigate(['/']);
      }
    }
  }

  aprovarServico(): void {
    const valorFormatado = this.orcamento.valorOrcado!.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    alert(`Serviço Aprovado no Valor ${valorFormatado}`);

    const solucoesString = localStorage.getItem('solicitacoes');
    if (solucoesString) {
        let todasSolicitacoes = JSON.parse(solucoesString) as SolicitacaoManutencao[];
        let solicitacaoAtualizada = todasSolicitacoes.find(s => s.id === this.orcamento.id);
        if (solicitacaoAtualizada) {
            solicitacaoAtualizada.status = 'APROVADA';
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
          let todasSolicitacoes = JSON.parse(solucoesString) as SolicitacaoManutencao[];
          let solicitacaoAtualizada = todasSolicitacoes.find(s => s.id === this.orcamento.id);
          if (solicitacaoAtualizada) {
              solicitacaoAtualizada.status = 'REJEITADA';
              localStorage.setItem('solicitacoes', JSON.stringify(todasSolicitacoes));
          }
      }

      this.router.navigate(['/']); 
    }
  }
}