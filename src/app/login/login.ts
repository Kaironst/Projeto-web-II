import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule, ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardHeader } from '@angular/material/card';
import {
  MatCard,
  MatCardTitle,
  MatCardContent,
  MatCardActions
} from "@angular/material/card";
import { ControlaForm } from '../services/controla-form';
import { Auth } from '../services/autenticacao/auth';
import { first } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatCardHeader, MatCard, MatCardTitle, MatCardContent, MatCardActions],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private router = inject(Router);
  private auth = inject(Auth);
  public formService = inject(ControlaForm);
  public formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required])
    });
  }

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login() {
    console.log("tentando logar");
    if (this.formGroup.valid) {
      this.auth.login({ username: this.formGroup.controls['email'].value, password: this.formGroup.controls['senha'].value }).pipe(first()).subscribe({
        next: () => {
          console.log("token salvo");
          alert('Login efetuado com sucesso!');
          this.router.navigate(['/']);
        },
        error: () => {
          console.error("erro no login");
          alert('O Login falhou');
        }
      });
    }
  }

  goCadastro() {
    this.router.navigate(['/cadastro']);
  }

}
