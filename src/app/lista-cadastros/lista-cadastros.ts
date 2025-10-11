import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { ClienteUtil, Cliente } from '../services/DBUtil/cliente-util';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list'

@Component({
  selector: 'app-lista-cadastros',

  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule],

  templateUrl: './lista-cadastros.html',
  styleUrl: './lista-cadastros.css'
})
export class ListaCadastros {

  cadastroService = inject(ClienteUtil);
  cadastros: Cliente[] = [];

  //usa subscribe para passar o valor ao array cadastros
  ngOnInit() {
    this.cadastroService.getAll().subscribe(listaCadastro => {
      this.cadastros = listaCadastro;
    });
  }


}
