import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Solicitacao, SolicitacaoUtil, Estado } from '../services/DBUtil/solicitacao-util';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-efetuar-manutencao',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatDividerModule, MatProgressSpinnerModule
  ],
  templateUrl: './efetuar-manutencao.html',
  styleUrls: ['./efetuar-manutencao.css']
})
export class EfetuarManutencaoComponent implements OnInit {

  solicitacao: Solicitacao | null = null;
  manutencaoForm: FormGroup;
  mostrarFormManutencao = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacaoUtil: SolicitacaoUtil
  ) {
    this.manutencaoForm = new FormGroup({
      descricaoManutencao: new FormControl('', Validators.required),
      orientacoesCliente: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.solicitacaoUtil.getSolicitacaoPorId(id).subscribe({
      next: (dados) => this.solicitacao = dados,
      error: (err) => {
        alert('Solicitação não encontrada.');
        this.router.navigate(['/admin/tela-funcionario']);
      }
    });
  }

  onEfetuarManutencaoSubmit(): void {
    if (this.manutencaoForm.invalid || !this.solicitacao) {
      return;
    }

    const dadosFormulario = this.manutencaoForm.value;

    const solicitacaoAtualizada: Solicitacao = {
      ...this.solicitacao,
      descricaoManutencao: dadosFormulario.descricaoManutencao,
      orientacoesCliente: dadosFormulario.orientacoesCliente,
      dataManutencao: new Date(),
      funcionario: {
        ...this.solicitacao.funcionario,
        nome: 'Funcionario Logado',
        id: 1,
      },
      estado: Estado.Arrumada
    };

    this.solicitacaoUtil.atualizarSolicitacao(this.solicitacao.id!, solicitacaoAtualizada)
      .subscribe({
        next: () => {
          alert('Manutenção registrada com sucesso! Status alterado para ARRUMADA.');
          this.router.navigate(['/admin/tela-funcionario']);
        },
        error: (err) => {
          alert('Erro ao registrar manutenção.');
        }
      });
  }

  redirecionarManutencao(): void {
    alert('');
  }
}
