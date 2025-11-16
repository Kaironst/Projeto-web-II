import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Solicitacao, SolicitacaoUtil, Estado } from '../services/DBUtil/solicitacao-util';
import { Funcionario, FuncionarioUtil } from '../services/DBUtil/funcionario-util';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Auth } from '../services/autenticacao/auth';

@Component({
  selector: 'app-efetuar-manutencao',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatDividerModule, MatProgressSpinnerModule,
    MatSelectModule
  ],
  templateUrl: './efetuar-manutencao.html',
  styleUrls: ['./efetuar-manutencao.css']
})
export class EfetuarManutencaoComponent implements OnInit {

  solicitacao: Solicitacao | null = null;
  manutencaoForm: FormGroup;
  redirecionamentoForm: FormGroup;

  mostrarFormManutencao = false;
  mostrarFormRedirecionamento = false;

  outrosFuncionarios: Funcionario[] = [];
  funcionarioLogado: Funcionario | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private solicitacaoUtil = inject(SolicitacaoUtil);
  private funcionarioUtil = inject(FuncionarioUtil);
  private auth = inject(Auth);

  constructor() {
    this.manutencaoForm = new FormGroup({
      descricaoManutencao: new FormControl('', Validators.required),
      orientacoesCliente: new FormControl('', Validators.required)
    });

    this.redirecionamentoForm = new FormGroup({
      funcionarioDestinoId: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.solicitacaoUtil.get(id).subscribe({
      next: (dados) => {
        this.solicitacao = dados;
        this.auth.getFuncionarioAtual().subscribe(f => {
          this.funcionarioLogado = f;
          this.carregarFuncionariosParaRedirecionamento();
        })
      },
      error: () => {
        alert('Solicitação não encontrada.');
        this.router.navigate(['/admin/tela-funcionario']);
      }
    });
  }

  carregarFuncionariosParaRedirecionamento(): void {
    this.funcionarioUtil.getAll().subscribe(todos => {
      this.outrosFuncionarios = todos.filter(f => f.id !== this.funcionarioLogado?.id);
    });
  }

  onEfetuarManutencaoSubmit(): void {
    if (this.manutencaoForm.invalid || !this.solicitacao?.id) return;

    const dadosFormulario = this.manutencaoForm.value;
    const solicitacaoAtualizada: Solicitacao = {
      ...this.solicitacao,
      ...dadosFormulario,
      dataManutencao: new Date(),
      estado: Estado.Arrumada
    };

    this.solicitacaoUtil.update(this.solicitacao.id, solicitacaoAtualizada).subscribe({
      next: () => {
        alert('Manutenção registrada com sucesso!');
        this.router.navigate(['/admin/tela-funcionario']);
      },
      error: () => alert('Erro ao registrar manutenção.')
    });
  }

  redirecionarManutencao(): void {
    this.mostrarFormManutencao = false;
    this.mostrarFormRedirecionamento = true;
  }

  onRedirecionarSubmit(): void {
    if (this.redirecionamentoForm.invalid || !this.solicitacao?.id) return;

    const funcionarioDestinoId = this.redirecionamentoForm.value.funcionarioDestinoId;
    const funcionarioDestino = this.outrosFuncionarios.find(f => f.id === funcionarioDestinoId);

    const solicitacaoAtualizada: Solicitacao = {
      ...this.solicitacao,
      funcionarioRedirecionado: this.funcionarioLogado,
      funcionario: funcionarioDestino,
      estado: Estado.Redirecionada
    };

    this.solicitacaoUtil.update(this.solicitacao.id, solicitacaoAtualizada).subscribe({
      next: () => {
        alert(`Solicitação redirecionada para ${funcionarioDestino?.nome}.`);
        this.router.navigate(['/admin/tela-funcionario']);
      },
      error: () => alert('Erro ao redirecionar solicitação.')
    });
  }

  cancelarAcao(): void {
    this.mostrarFormManutencao = false;
    this.mostrarFormRedirecionamento = false;
  }
}
