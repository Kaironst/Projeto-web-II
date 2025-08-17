import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitarManutencao } from './solicitar_manutencao/solicitar_manutencao';
import { TelaUsuario } from './tela_usuario/tela_usuario';

export const routes: Routes = [
  {
    path: 'solicitar_manutencao',
    component: SolicitarManutencao
  },
  {
    path: 'tela_usuario',
    component: TelaUsuario
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }