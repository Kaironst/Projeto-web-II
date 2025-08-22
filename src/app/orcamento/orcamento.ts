import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface SolicitacaoManutencao {
  id?: number;
  descEquipamento: string;
  categEquipamento: string;
  descDefeito: string;
  dataHora: Date;
  status: 'APROVADA' | 'REJEITADA' | 'ORÇADA';
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

  //feito para testar
  //incorporar um json junto ao solicitar manutencao para a prototipacao
  ngOnInit(): void {
    this.orcamento = {
      id: 1,
      descEquipamento: 'Iphone 15',
      categEquipamento: 'Celular',
      descDefeito: 'Tela trincada',
      dataHora: new Date(),
      status: 'ORÇADA',
      valorOrcado: 1250.00
    };
  }

  aprovarServico(): void {
    const valorFormatado = this.orcamento.valorOrcado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    alert(`Serviço Aprovado no Valor ${valorFormatado}`);

    console.log(`Status da solicitação ${this.orcamento.id} alterado para APROVADA.`);
    
    this.router.navigate(['/tela_usuario']);
  }

  rejeitarServico(): void {
    const motivo = prompt('Motivo da rejeição:');
    
    if (motivo !== null) {
      alert('Serviço rejeitado.');

      this.router.navigate(['/']); 
    }
  }
}