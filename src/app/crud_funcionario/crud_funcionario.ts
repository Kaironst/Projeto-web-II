import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Categoria } from '../services/DBUtil/categoria-util';


@Component({
  selector: 'app-gerenciar-funcionarios',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './crud_funcionario.html',
  styleUrls: ['./crud_funcionario.css']
})
export class GerenciarFuncionariosComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  private carregarFuncionarios(): void {
  }

  private persistirLista(): void {
  }

  private gerarNovoId(): number {
    return 0;
  }

  salvarCategoria(): void {

    }

  removerCategoria(id: number): void {

  }
}
