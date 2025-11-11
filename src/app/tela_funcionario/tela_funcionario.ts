import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Solicitacao, SolicitacaoUtil } from '../services/DBUtil/solicitacao-util';

@Component({
  selector: 'app-tela-funcionario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tela_funcionario.html',
  styleUrls: ['./tela_funcionario.css']
})
export class TelaFuncionarioComponent implements OnInit {

  solicitacoesAbertas: Solicitacao[] = [];

  router = inject(Router);
  solicitacaoUtil = inject(SolicitacaoUtil)

  ngOnInit(): void {
    this.carregarSolicitacoes();
  }

  carregarSolicitacoes(): void {
    this.solicitacaoUtil.getAll().subscribe({
      next: (todasSolicitacoes) => {
        const solicitacoesFiltradas = todasSolicitacoes.filter(s => s.estado === this.solicitacaoUtil.estado.Aberta);

        this.solicitacoesAbertas = solicitacoesFiltradas.map(s => ({
          ...s,
          dataHora: new Date(s.dataHora),
        })).sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime());
      },
      error: (err) => {
        console.error('Erro ao carregar solicitações para funcionário:', err);
        this.solicitacoesAbertas = [];
      }
    });
  }

  efetuarOrcamento(id: number): void {
    this.router.navigate(['/admin/efetuar-orcamento', id]);
  }

  limitarTexto(texto: string, limite: number): string {
    if (texto.length <= limite) {
      return texto;
    }
    return texto.substring(0, limite) + '...';
  }
}
