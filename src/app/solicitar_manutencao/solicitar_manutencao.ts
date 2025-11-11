import { inject, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria, CategoriaUtil } from '../services/DBUtil/categoria-util';
import { Solicitacao, SolicitacaoUtil } from '../services/DBUtil/solicitacao-util';
import { Auth } from '../services/autenticacao/auth';
import { Cliente } from '../services/DBUtil/cliente-util';



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

export class SolicitarManutencaoComponent implements OnInit {

  manutencaoForm!: FormGroup;
  categorias: Categoria[] = [];
  clienteLogado: Cliente | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private categoriaUtil = inject(CategoriaUtil);
  private solicitacaoUtil = inject(SolicitacaoUtil);
  private auth = inject(Auth);

  private carregarCategorias(): void {
    this.categoriaUtil.getAll().subscribe(categorias => { this.categorias = categorias; });
  }

  ngOnInit(): void {
    this.carregarCategorias();

    this.auth.getClienteAtual().subscribe({
      next: (cliente) => {
        this.clienteLogado = cliente;
      },
      error: (err) => {
        console.error("Erro ao buscar cliente logado", err);
        alert("Erro ao identificar cliente. Faça login novamente.");
        this.router.navigate(['/login']);
      }
    });

    this.manutencaoForm = new FormGroup({
      desc_equipamento: new FormControl(null, Validators.required),
      categ_equipamento: new FormControl(null, Validators.required),
      desc_defeito: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    if (this.manutencaoForm.valid) {
      const nomeCategoria = this.manutencaoForm.value.categ_equipamento;
      const categoriaSelecionada = this.categorias.find(c => c.nome === nomeCategoria);

      const novaSolicitacao: Solicitacao = {
        equipamento: this.manutencaoForm.value.desc_equipamento,
        categEquipamento: categoriaSelecionada,
        descDefeito: this.manutencaoForm.value.desc_defeito,
        dataHora: new Date(),
        estado: this.solicitacaoUtil.estado.Aberta,
        cliente: this.clienteLogado!
      };

      this.solicitacaoUtil.criar(novaSolicitacao).subscribe({
        next: (solicitacaoSalva) => {
          console.log('Solicitação salva no backend:', solicitacaoSalva);
          alert('Sua solicitação foi enviada com sucesso!');
          this.manutencaoForm.reset();
          this.router.navigate(['/tela_usuario']);
        },
        error: (err) => {
          console.error('Erro ao salvar solicitação:', err);
          alert('Falha ao enviar solicitação.');
        }
      });

    } else {
      console.log('formulario invalido');
    }
  }
}
