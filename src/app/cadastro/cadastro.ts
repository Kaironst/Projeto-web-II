import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatCardContent } from "@angular/material/card";
import { ClienteUtil, Cliente } from '../services/DBUtil/cliente-util';
import { ControlaForm } from '../services/controla-form';
import { CepService } from '../services/cep';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatCard, MatCardHeader, MatCardTitle,
    MatCardSubtitle, MatCardActions, MatCardContent, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {

  cadastroService = inject(ClienteUtil);
  private router = inject(Router);
  formService = inject(ControlaForm);

  criarNovo(): void {
    if (this.formService.formCadastro.valid) {
      let novo: Cliente = {
        ...this.formService.formCadastro.value,
        senha: this.cadastroService.gerarSenha()
      }

      this.cadastroService.criar(novo).subscribe({
        next: (res) => console.log('Usuário cadastrado!', res),
        error: (err) => console.error('Erro ao cadastrar', err)
      });

    }
  }

  cepControl = new FormControl('');
  rua = '';
  bairro = '';
  cidade = '';
  uf = '';

  constructor(private cepService: CepService) { }

  onCepChange() {
    const cep = this.cepControl.value?.replace(/\D/g, '');
    if (cep?.length === 8) {
      this.cepService.buscarCep(cep).subscribe({
        next: (dados) => {
          if (!dados.erro) {
            this.rua = dados.logradouro;
            this.bairro = dados.bairro;
            this.cidade = dados.localidade;
            this.uf = dados.uf;
          }
        },
        error: (err) => {
          console.error('Erro ao buscar CEP:', err);
        }
      });
    }
  }

}
