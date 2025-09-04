import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErroSubmitForm } from './erro-submit-form';

@Injectable({
  providedIn: 'root'
})

export class ControlaForm {

  formCadastro = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nome: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    cep: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [Validators.required])
  })
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
  necessarioFormControl = new FormControl('', [Validators.required]);

  cpfValidator(): ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {
      let cpf :string = control.value;
      if (!cpf) return null;
      
      for(let char of cpf) {
        if (char < '0' || char > '9')
          return {cpfInvalido: true};
      }
      
      let soma = 0;
    let resto;

    // Primeiro dígito verificador
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return { cpfInvalido: true };

    // Segundo dígito verificador
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return { cpfInvalido: true };

    return null; // CPF válido
    }
  }

  constructor(
    private router: Router,
    public matcher: ErroSubmitForm
  ) {}

}
