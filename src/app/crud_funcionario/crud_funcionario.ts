import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Funcionario, FuncionarioUtil } from '../services/DBUtil/funcionario-util';
import { Observable } from 'rxjs';
import { Auth } from '../services/autenticacao/auth';

@Component({
  selector: 'app-gerenciar-funcionarios',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatListModule, MatDividerModule, MatIconModule,
    MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './crud_funcionario.html',
  styleUrls: ['./crud_funcionario.css']
})
export class GerenciarFuncionariosComponent implements OnInit {

  funcionarios: Funcionario[] = [];
  funcionarioForm: FormGroup;
  funcionarioSelecionadoId: number | null = null;
  funcionarioLogado: Funcionario | null = null;
  funcionarioUtil = inject(FuncionarioUtil);
  auth = inject(Auth);

  constructor() {
    this.funcionarioForm = new FormGroup({
      nome: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      dataNascimento: new FormControl(null, Validators.required),
      senha: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.auth.getFuncionarioAtual().subscribe(f => {
      this.funcionarioLogado = f;
      this.carregarFuncionarios();
    })
  }

  carregarFuncionarios(): void {
    this.funcionarioUtil.getFuncionarios().subscribe(data => {
      this.funcionarios = data;
    });
  }

  salvarFuncionario(): void {
    if (this.funcionarioForm.invalid) {
      return;
    }

    const formValue = this.funcionarioForm.value;
    let acao: Observable<Funcionario>;

    if (this.funcionarioSelecionadoId) {
      const funcionarioAtualizado = { id: this.funcionarioSelecionadoId, ...formValue };
      acao = this.funcionarioUtil.atualizarFuncionario(this.funcionarioSelecionadoId, funcionarioAtualizado);
    } else {
      acao = this.funcionarioUtil.criarFuncionario(formValue);
    }

    acao.subscribe({
      next: () => {
        this.carregarFuncionarios();
        this.cancelarEdicao();
      },
      error: (err) => alert(err.message || 'erro ao salvar funcionário.')
    });
  }

  editarFuncionario(funcionario: Funcionario): void {
    this.funcionarioSelecionadoId = funcionario.id;
    this.funcionarioForm.patchValue({
      nome: funcionario.nome,
      email: funcionario.email,
      dataNascimento: funcionario.dataNascimento
    });
    this.funcionarioForm.get('senha')?.clearValidators();
    this.funcionarioForm.get('senha')?.updateValueAndValidity();
  }

  cancelarEdicao(): void {
    this.funcionarioSelecionadoId = null;
    this.funcionarioForm.reset();
    this.funcionarioForm.get('senha')?.setValidators([Validators.required]);
    this.funcionarioForm.get('senha')?.updateValueAndValidity();
  }

  removerFuncionario(id: number): void {
    if (confirm('deseja remover este funcionário?')) {
      if (this.funcionarioLogado!.id === id) {
        alert("não é possível remover a si mesmo");
      }
      if (this.funcionarios.length === 1) {
        alert("não é possível remover o único funcionário");
      }
      this.funcionarioUtil.removerFuncionario(id).subscribe({
        next: () => {
          this.carregarFuncionarios();
          if (this.funcionarioSelecionadoId === id) {
            this.cancelarEdicao();
          }
        },
        error: (err) => alert(err.message)
      });
    }
  }
}
