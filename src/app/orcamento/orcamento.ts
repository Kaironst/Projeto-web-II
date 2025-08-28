import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface SolicitacaoManutencao {
  id?: number;
  descEquipamento: string;
  categEquipamento: string;
  descDefeito: string;
  dataHora: Date;
  status: 'APROVADA' | 'REJEITADA' | 'ORÇADA' | 'ABERTA';
}

@Component({
  selector: 'app-orcamento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orcamento.html',
  styleUrls: ['./orcamento.css']
})

export class Orcamento implements OnInit {
  
  orcamento: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const solucoesString = localStorage.getItem('solicitacoes');
    if (solucoesString) {
      const todasSolicitacoes = JSON.parse(solucoesString) as SolicitacaoManutencao[];
      //mudar para o ID após incorporar melhor o sistema
      const solicitacaoParaOrcar = todasSolicitacoes.find(s => s.status === 'ABERTA');
      if (solicitacaoParaOrcar) {
        this.orcamento = {
          ...solicitacaoParaOrcar,
          valorOrcado: 1250.00 //teste
        };
        solicitacaoParaOrcar.status = 'ORÇADA';
        localStorage.setItem('solicitacoes', JSON.stringify(todasSolicitacoes));

        } else {
        console.error("Nenhuma solicitação aberta encontrada para orçar.");
        alert("Não há solicitações abertas no momento.");
      }
    }
  }

  aprovarServico(): void {
    const valorFormatado = this.orcamento.valorOrcado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    alert(`Serviço Aprovado no Valor ${valorFormatado}`);

    // Lógica para atualizar o localStorage
    const solucoesString = localStorage.getItem('solicitacoes');
    if (solucoesString) {
        let todasSolicitacoes = JSON.parse(solucoesString) as SolicitacaoManutencao[];
        let solicitacaoAtualizada = todasSolicitacoes.find(s => s.id === this.orcamento.id);
        if (solicitacaoAtualizada) {
            solicitacaoAtualizada.status = 'APROVADA';
            localStorage.setItem('solicitacoes', JSON.stringify(todasSolicitacoes));
            console.log(`Status da solicitação ${this.orcamento.id} alterado para APROVADA no localStorage.`);
        }
    }}

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
              console.log(`Status da solicitação ${this.orcamento.id} alterado para REJEITADA no localStorage.`);
          }
      }

      this.router.navigate(['/']); 
    }
  }
}