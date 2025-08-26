import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitarManutencao } from './solicitar_manutencao/solicitar_manutencao';
import { TelaUsuario } from './tela_usuario/tela_usuario';
import { Login } from './login/login';
import { Cadastro } from './cadastro/cadastro';
import { Orcamento } from './orcamento/orcamento';

export const routes: Routes = [
  {
    path: 'solicitar_manutencao',
    component: SolicitarManutencao
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
    path: 'orcamento',
    component: Orcamento
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }