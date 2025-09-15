import { Component, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../crud_categoria/crud_categoria';

export interface SolicitacaoManutencao {
  id: number;
  descEquipamento: string;
  categEquipamento: string;
  descDefeito: string;
  dataHora: Date;
  status: 'ABERTA' | 'ORÇADA' | 'APROVADA' | 'REJEITADA' | 'CONCLUIDA';
  
  cliente?: {
    nome: string;
    telefone: string;
    email: string;
  };

  valorOrcado?: number;
  funcionarioOrcamento?: string;
  dataOrcamento?: Date;
}

@Component({
  selector: 'app-solicitarmanutencao',
  standalone: true,
  imports: [CommonModule, 
  ReactiveFormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule],
  templateUrl: './solicitar_manutencao.html',
  styleUrls: ['./solicitar_manutencao.css']
})

export class SolicitarManutencaoComponent implements OnInit{

  manutencaoForm!: FormGroup;
  categorias: Categoria[] = [];
  constructor(private route: ActivatedRoute, private router: Router, ) { }

  private carregarCategorias(): void {
    const categoriasString = localStorage.getItem('categorias');
    this.categorias = categoriasString ? JSON.parse(categoriasString) : [];
  }
  
  ngOnInit(): void {
    this.carregarCategorias();

    this.manutencaoForm = new FormGroup({
      desc_equipamento: new FormControl(null, Validators.required),
      categ_equipamento: new FormControl(null, Validators.required),
      desc_defeito: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    if (this.manutencaoForm.valid) {
      const solucoesAntigasString = localStorage.getItem('solicitacoes');
      const solucoesAntigas = solucoesAntigasString ? JSON.parse(solucoesAntigasString) : [];

      const novaSolicitacao: SolicitacaoManutencao = {
        id: solucoesAntigas.length + 1,
        descEquipamento: this.manutencaoForm.value.desc_equipamento,
        categEquipamento: this.manutencaoForm.value.categ_equipamento,
        descDefeito: this.manutencaoForm.value.desc_defeito,
        dataHora: new Date(),
        status: 'ABERTA'
      };

      const novasSolicitacoes = [...solucoesAntigas, novaSolicitacao];

      localStorage.setItem('solicitacoes', JSON.stringify(novasSolicitacoes));

     console.log('Solicitação salva no localStorage:', novaSolicitacao);
      alert('Sua solicitação foi enviada com sucesso!');
      
      this.manutencaoForm.reset();
    } else {
      console.log('formulario invalido');
    }
    this.router.navigate(['/']);
  }
}