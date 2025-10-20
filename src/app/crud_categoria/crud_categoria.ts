import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Categoria, CategoriaUtil } from '../services/DBUtil/categoria-util';


@Component({
  selector: 'app-gerenciar-categorias',
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
  templateUrl: './crud_categoria.html',
  styleUrls: ['./crud_categoria.css']
})
export class GerenciarCategoriasComponent implements OnInit {

  categoriaUtil = inject(CategoriaUtil);
  bancoConectado: boolean = false;
  categorias: Categoria[] = [];
  categoriaForm: FormGroup;
  categoriaSelecionadaId?: number | null = null;
  private storageKey = 'categorias';

  constructor() {
    this.categoriaForm = new FormGroup({
      nome: new FormControl(null, [Validators.required, Validators.minLength(2)])
    });
  }

  async ngOnInit(): Promise<void> {
    this.bancoConectado = await this.categoriaUtil.ping();
    this.carregarCategorias();
  }

  private carregarCategorias(): void {
    if (this.bancoConectado) {
      this.categoriaUtil.getAll().subscribe(
        (dados: Categoria[]) => { this.categorias = dados; }
      );
    }
    else {
      const categoriasString = localStorage.getItem(this.storageKey);
      this.categorias = categoriasString ? JSON.parse(categoriasString) : [];
    }
  }

  //apenas usada para localstorage
  private persistirLista(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.categorias));
  }

  private gerarNovoId(): number {
    if (this.categorias.length === 0) {
      return 1;
    }
    const maxId = Math.max(...this.categorias.map(c => c.id!));
    return maxId + 1;
  }

  salvarCategoria(): void {
    if (this.categoriaForm.invalid) {
      return;
    }

    const nomeCategoria = this.categoriaForm.value.nome;

    if (this.bancoConectado) {
      if (this.categoriaSelecionadaId !== null) {
        const index = this.categorias.findIndex(c => c.id === this.categoriaSelecionadaId);
        if (index !== 1) {
          this.categoriaUtil.get(index).subscribe(
            (categoria: Categoria) => { this.categoriaUtil.update(categoria.id!, categoria) }
          );
        }
      }
      else {
        const novaCategoria: Categoria = {
          id: this.gerarNovoId(),
          nome: nomeCategoria
        };
        this.categoriaUtil.criar(novaCategoria);
        this.carregarCategorias();
      }
    }
    else {
      if (this.categoriaSelecionadaId !== null) {
        const index = this.categorias.findIndex(c => c.id === this.categoriaSelecionadaId);
        if (index !== -1) {
          this.categorias[index].nome = nomeCategoria;
        }
      } else {
        const novaCategoria: Categoria = {
          id: this.gerarNovoId(),
          nome: nomeCategoria
        };
        this.categorias.push(novaCategoria);
      }

      this.persistirLista();
    }

    this.cancelarEdicao();
  }

  editarCategoria(categoria: Categoria): void {
    this.categoriaSelecionadaId = categoria.id;
    this.categoriaForm.patchValue({
      nome: categoria.nome
    });
  }

  cancelarEdicao(): void {
    this.categoriaSelecionadaId = null;
    this.categoriaForm.reset();
  }

  removerCategoria(id: number): void {
    if (confirm('Tem certeza que deseja remover esta categoria?')) {
      if (this.bancoConectado) {
        this.categoriaUtil.delete(id);
      }
      else {
        this.categorias = this.categorias.filter(c => c.id !== id);
        this.persistirLista();
      }

      if (this.categoriaSelecionadaId === id) {
        this.cancelarEdicao();
      }
    }
  }
}
