import {
  ChangeDetectionStrategy, 
  Component, 
  EventEmitter, 
  Output, 
  signal 
} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule,
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardHeader} from '@angular/material/card';
import {
  MatCard, 
  MatCardTitle, 
  MatCardContent, 
  MatCardActions
} from "@angular/material/card";
import { ControlaForm } from '../../services/controla-form';


@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatCardHeader, MatCard, MatCardTitle, MatCardContent, MatCardActions],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  @Output() fecharLogin = new EventEmitter<void>();

  fechar() {
    this.fecharLogin.emit();
  }

  hide = signal(true);
    clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
      private router: Router,
      public formService: ControlaForm
    ) {}

  goCadastro() {
    this.router.navigate(['/cadastro']);
  }

  cadastrarFechar() {
  this.goCadastro();
  this.fecharLogin.emit();
}
}
