import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ControlEvent, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatCardContent } from "@angular/material/card";
import { ClienteUtil, Cliente } from '../services/DBUtil/cliente-util';
import { ControlaForm } from '../services/controla-form';
import { CepService } from '../services/cep';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { switchMap, throwError } from 'rxjs';
import { EmailUtil } from '../services/email-util';

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

  formService = inject(ControlaForm);
  cadastroService = inject(ClienteUtil);
  cepService = inject(CepService);
  emailService = inject(EmailUtil);
  formGroup: FormGroup;

  constructor() {

    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nome: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), this.formService.cpfValidator()]),
      cep: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required])
    })


  }

  criarNovo(): void {
    if (this.formGroup.valid) {
      let novo: Cliente = {
        ...this.formGroup.value,
        senha: this.cadastroService.gerarSenha()
      }

      this.cadastroService.getByEmail(novo.email!).pipe(
        switchMap(cliente => {
          if (cliente) {
            console.error("email já existe");
            alert("o email já existe");
            return throwError(() => new Error("Email já existe"));
          }
          else
            return this.cadastroService.criar(novo)

        })
      ).pipe(
      switchMap(() =>
        this.emailService.enviarSenha(novo.email!, novo.senha!)
      )
      ).subscribe({
        next: () => console.log("Usuário cadastrado e e-mail enviado!"),
        error: (err) => console.error("Erro ao cadastrar ou enviar e-mail", err)
      });


    }
  }

  cepControl = new FormControl('');
  rua = '';
  bairro = '';
  cidade = '';
  uf = '';


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
