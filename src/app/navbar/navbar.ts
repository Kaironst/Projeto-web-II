import { inject, Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule, MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { Login } from "./login/login";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  imports: [
    MatToolbarModule,
    RouterLink,
    MatToolbar,
    MatIconModule,
    Login
]
})


export class Navbar {

  mostrarLogin = false;

  exibirLogin() {
    this.mostrarLogin = !this.mostrarLogin;
  }
  

}