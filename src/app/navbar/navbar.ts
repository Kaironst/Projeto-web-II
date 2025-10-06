import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule, MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { Login } from "../login/login";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterLink,
    MatToolbar,
    MatIconModule,
    MatMenuModule,
    Login
  ]
})


export class Navbar {

  mostrarLogin = false;

  exibirLogin() {
    this.mostrarLogin = !this.mostrarLogin;
  }


}
