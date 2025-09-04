import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitarManutencaoComponent } from './solicitar_manutencao/solicitar_manutencao';
import { TelaUsuario } from './tela_usuario/tela_usuario';
import { Login } from './login/login';
import { Cadastro } from './cadastro/cadastro';
import { OrcamentoComponent } from './orcamento/orcamento';
import { EfetuarOrcamentoComponent } from './efetuar_orcamento/efetuar_orcamento';
import { ListaCadastros } from './lista-cadastros/lista-cadastros';

export const routes: Routes = [
  {
    path: 'solicitar_manutencao',
    component: SolicitarManutencaoComponent
  },
  {
    path: 'tela_usuario',
    component: TelaUsuario
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'cadastro',
    component: Cadastro
  },
  {
    path: 'orcamento/:id',
    component: OrcamentoComponent
  },
  {
    path: 'efetuar-orcamento/:id',
    component: EfetuarOrcamentoComponent
  },
  {
    path: 'lista-cadastros',
    component: ListaCadastros
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }