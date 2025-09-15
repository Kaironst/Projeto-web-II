import { inject, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tela_principal',
  templateUrl: './tela_principal.html',
  styleUrl: './tela_principal.css',
  imports: [
    MatDialogModule,
    MatButtonModule
  ]
})


export class TelaPrincipal {

}