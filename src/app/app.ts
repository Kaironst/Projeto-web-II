import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, Login],
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
