import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';    
import { SolicitacaoManutencao } from '../solicitar_manutencao/solicitar_manutencao';

@Component({
  selector: 'app-tela-funcionario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tela_funcionario.html',
  styleUrls: ['./tela_funcionario.css']
})
export class TelaFuncionarioComponent implements OnInit {

  solicitacoesAbertas: SolicitacaoManutencao[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.carregarSolicitacoes();
  }

  carregarSolicitacoes(): void {
    const solucoesString = localStorage.getItem('solicitacoes');
    if (!solucoesString) {
      this.solicitacoesAbertas = [];
      return;
    }

    const todasSolicitacoes = JSON.parse(solucoesString) as SolicitacaoManutencao[];
    
    const solicitacoesFiltradas = todasSolicitacoes.filter(s => s.status === 'ABERTA');

    this.solicitacoesAbertas = solicitacoesFiltradas.map(s => ({
      ...s,
      dataHora: new Date(s.dataHora),
    }));

    this.solicitacoesAbertas.sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime());
  }

  efetuarOrcamento(id: number): void {
    this.router.navigate(['/efetuar-orcamento', id]);
  }

  limitarTexto(texto: string, limite: number): string {
    if (texto.length <= limite) {
      return texto;
    }
    return texto.substring(0, limite) + '...';
  }
}