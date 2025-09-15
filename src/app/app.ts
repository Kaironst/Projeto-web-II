import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TelaPrincipal } from "./tela_principal/tela_principal";
import { Navbar } from "./navbar/navbar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, Navbar],
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
