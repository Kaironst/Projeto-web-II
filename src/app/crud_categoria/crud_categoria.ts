import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Categoria, CategoriaUtil } from '../services/DBUtil/categoria-util'; // Importe o serviço
import { Observable } from 'rxjs';

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

  categorias: Categoria[] = [];
  categoriaForm: FormGroup;
  categoriaSelecionadaId?: number | null = null;
  
  private categoriaUtil = inject(CategoriaUtil);

  constructor() {
    this.categoriaForm = new FormGroup({
      nome: new FormControl(null, [Validators.required, Validators.minLength(2)])
    });
  }

  ngOnInit(): void {
    this.carregarCategorias();
  }

  private carregarCategorias(): void {
    this.categoriaUtil.getAll().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => alert('Erro ao carregar categorias.')
    });
  }

  salvarCategoria(): void {
    if (this.categoriaForm.invalid) {
      return;
    }

    const nomeCategoria = this.categoriaForm.value.nome;
    let acao: Observable<Categoria>;

    if (this.categoriaSelecionadaId) {
      const categoriaAtualizada: Categoria = {
        id: this.categoriaSelecionadaId,
        nome: nomeCategoria
      };
      acao = this.categoriaUtil.update(this.categoriaSelecionadaId, categoriaAtualizada);
    } else {
      const novaCategoria: Categoria = {
        nome: nomeCategoria
      };
      acao = this.categoriaUtil.criar(novaCategoria);
    }

    acao.subscribe({
      next: () => {
        this.carregarCategorias();
        this.cancelarEdicao();
      },
      error: (err) => alert('Erro ao salvar categoria.')
    });
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
      this.categoriaUtil.delete(id).subscribe({
        next: () => {
          this.carregarCategorias();
          if (this.categoriaSelecionadaId === id) {
            this.cancelarEdicao();
          }
        },
        error: (err) => alert('Erro ao remover categoria. Verifique se ela está sendo usada por alguma solicitação.')
      });
    }
  }
} 
