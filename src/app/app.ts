import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  mostrarLogin = false;

  exibirLogin() {
    this.mostrarLogin = !this.mostrarLogin;
  }

  protected readonly title = signal('projetoWeb2');
  
}
