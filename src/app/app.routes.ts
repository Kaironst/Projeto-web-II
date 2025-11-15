import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitarManutencaoComponent } from './solicitar_manutencao/solicitar_manutencao';
import { TelaUsuario } from './tela_usuario/tela_usuario';
import { TelaPrincipal } from './tela_principal/tela_principal';
import { Login } from './login/login';
import { Cadastro } from './cadastro/cadastro';
import { OrcamentoComponent } from './orcamento/orcamento';
import { EfetuarOrcamentoComponent } from './efetuar_orcamento/efetuar_orcamento';
import { ListaCadastros } from './lista-cadastros/lista-cadastros';
import { GerenciarCategoriasComponent } from './crud_categoria/crud_categoria';
import { GerenciarFuncionariosComponent } from './crud_funcionario/crud_funcionario';
import { TelaFuncionarioComponent } from './tela_funcionario/tela_funcionario';
import { EfetuarManutencaoComponent } from './efetuar-manutencao/efetuar-manutencao';
import { FinalizarManutencaoComponent } from './finalizar_manutencao/finalizar_manutencao';
import { VisualizacaoSolicitacoesComponent } from './visualizacao_solicitacoes/visualizacao_solicitacoes';
import { authGuard } from './services/autenticacao/auth';

export const routes: Routes = [
  {
    path: '',
    component: TelaPrincipal,
    pathMatch: 'full'
  },
  {
    path: 'solicitar_manutencao',
    component: SolicitarManutencaoComponent,
    canActivate: [authGuard],
    data: { roles: ["ROLE_CLIENTE"] }
  },
  {
    path: 'tela_usuario',
    component: TelaUsuario,
    canActivate: [authGuard],
    data: { roles: ["ROLE_CLIENTE"] }
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'cadastro',
    component: Cadastro
  },
  {
    path: 'orcamento/:id',
    component: OrcamentoComponent,
    canActivate: [authGuard],
    data: { roles: ["ROLE_ADMIN", "ROLE_FUNCIONARIO"] }
  },
  {
    path: 'admin/efetuar-orcamento/:id',
    component: EfetuarOrcamentoComponent,
    canActivate: [authGuard],
    data: { roles: ["ROLE_ADMIN", "ROLE_FUNCIONARIO"] }
  },
  {
    path: 'lista-cadastros',
    component: ListaCadastros,
    canActivate: [authGuard],
    data: { roles: ["ROLE_ADMIN", "ROLE_FUNCIONARIO"] }
  },
  {
    path: 'admin/categorias',
    component: GerenciarCategoriasComponent,
    canActivate: [authGuard],
    data: { roles: ["ROLE_ADMIN", "ROLE_FUNCIONARIO"] }
  },
  {
    path: 'admin/funcionarios',
    component: GerenciarFuncionariosComponent,
    canActivate: [authGuard],
    data: { roles: ["ROLE_ADMIN"] }
  },
  {
    path: 'admin/tela-funcionario',
    component: TelaFuncionarioComponent,
    canActivate: [authGuard],
    data: { roles: ["ROLE_ADMIN", "ROLE_FUNCIONARIO"] }
  },
  {
    path: 'admin/efetuar-manutencao/:id',
    component: EfetuarManutencaoComponent,
    canActivate: [authGuard],
    data: { roles: ["ROLE_ADMIN", "ROLE_FUNCIONARIO"] }
  },
  {
    path: 'admin/solicitacoes',
    component: VisualizacaoSolicitacoesComponent,
    canActivate: [authGuard],
    data: { roles: ["ROLE_ADMIN", "ROLE_FUNCIONARIO"] }
  },
  {
    path: 'admin/finalizar-manutencao/:id',
    component: FinalizarManutencaoComponent,
    canActivate: [authGuard],
    data: { roles: ["ROLE_ADMIN", "ROLE_FUNCIONARIO"] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
