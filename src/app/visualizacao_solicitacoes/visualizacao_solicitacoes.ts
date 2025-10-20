import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { Solicitacao, SolicitacaoUtil } from '../services/DBUtil/solicitacao-util';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-visualizacao-solicitacoes',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatListModule, MatIconModule
  ],
  templateUrl: './visualizacao_solicitacoes.html',
  styleUrls: ['./visualizacao_solicitacoes.css']
})
export class VisualizacaoSolicitacoesComponent implements OnInit {

  todasSolicitacoes: Solicitacao[] = [];
  solicitacoesFiltradas: Solicitacao[] = [];
  filtroForm: FormGroup;
  
  solicitacaoUtil = inject(SolicitacaoUtil);
  private router = inject(Router);

  constructor() {
    this.filtroForm = new FormGroup({
      tipoFiltro: new FormControl('TODAS'),
      dataInicio: new FormControl(null),
      dataFim: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.carregarSolicitacoes();
    this.filtroForm.valueChanges.subscribe(() => this.aplicarFiltro());
  }

  carregarSolicitacoes(): void {
    this.solicitacaoUtil.getAll().subscribe({
      next: (dados) => {
        this.todasSolicitacoes = dados.map(s => ({
          ...s,
          dataHora: new Date(s.dataHora)
        })).sort((a, b) => a.dataHora.getTime() - b.dataHora.getTime());
        this.aplicarFiltro();
      },
      error: (err) => console.error('Erro ao buscar solicitações', err)
    });
  }

  aplicarFiltro(): void {
    const { tipoFiltro, dataInicio, dataFim } = this.filtroForm.value;
    let resultado = this.todasSolicitacoes;

    if (tipoFiltro === 'HOJE') {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const amanha = new Date(hoje);
      amanha.setDate(hoje.getDate() + 1);
      
      resultado = this.todasSolicitacoes.filter(s => 
        s.dataHora >= hoje && s.dataHora < amanha
      );
    } else if (tipoFiltro === 'PERIODO' && dataInicio && dataFim) {
      const fimPeriodo = new Date(dataFim);
      fimPeriodo.setHours(23, 59, 59, 999);

      resultado = this.todasSolicitacoes.filter(s =>
        s.dataHora >= new Date(dataInicio) && s.dataHora <= fimPeriodo
      );
    }
    
    this.solicitacoesFiltradas = resultado;
  }

  irParaAcao(solicitacao: Solicitacao): void {
    const estado = solicitacao.estado;
    if (estado === this.solicitacaoUtil.estado.Aberta) {
      this.router.navigate(['/admin/efetuar-orcamento', solicitacao.id]);
    } else if (estado === this.solicitacaoUtil.estado.Aprovada || estado === this.solicitacaoUtil.estado.Redirecionada) {
      this.router.navigate(['/admin/efetuar-manutencao', solicitacao.id]);
    } else if (estado === this.solicitacaoUtil.estado.Paga) {
      // navegar para RF016
       alert('Navegação para Finalizar Solicitação (RF016) não implementada.');
    }
  }

  getCorPorEstado(estado: number): string {
    const cores: { [key: number]: string } = {
      [this.solicitacaoUtil.estado.Aberta]: 'cinza',
      [this.solicitacaoUtil.estado.Orcada]: 'marrom',
      [this.solicitacaoUtil.estado.Rejeitada]: 'vermelho',
      [this.solicitacaoUtil.estado.Aprovada]: 'amarelo',
      [this.solicitacaoUtil.estado.Redirecionada]: 'roxo',
      [this.solicitacaoUtil.estado.Arrumada]: 'azul',
      [this.solicitacaoUtil.estado.Paga]: 'laranja',
      [this.solicitacaoUtil.estado.Finalizada]: 'verde'
    };
    return cores[estado] || '';
  }
}