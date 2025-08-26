import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface SolicitacaoManutencao {
  id?: number;
  descEquipamento: string;
  categEquipamento: string;
  descDefeito: string;
  dataHora: Date;
  status: 'ABERTA';
}

@Component({
  selector: 'app-solicitarmanutencao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitar_manutencao.html',
  styleUrls: ['./solicitar_manutencao.css']
})

export class SolicitarManutencao{

  manutencaoForm!: FormGroup;

  ngOnInit(): void {
    this.manutencaoForm = new FormGroup({
      desc_equipamento: new FormControl(null, Validators.required),
      categ_equipamento: new FormControl(null, Validators.required),
      desc_defeito: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    if (this.manutencaoForm.valid) {
      const novaSolicitacao: SolicitacaoManutencao = {
        descEquipamento: this.manutencaoForm.value.desc_equipamento,
        categEquipamento: this.manutencaoForm.value.categ_equipamento,
        descDefeito: this.manutencaoForm.value.desc_defeito,
        dataHora: new Date(),
        status: 'ABERTA'
      };

      console.log('teste:', novaSolicitacao);
      
      this.manutencaoForm.reset();
    } else {
      console.log('formulario invalido');
    }
  }
}