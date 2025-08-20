import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  /*
  * inutilizados até descobrirmos como vamos fazer o layour (por enquanto usando routerlink)
  mostrarLogin = false;

  exibirLogin() {
    this.mostrarLogin = !this.mostrarLogin;
  }
  */
  protected readonly title = signal('projetoWeb2');
  
}
