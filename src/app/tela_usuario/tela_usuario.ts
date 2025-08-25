import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';



interface Solicitacao {
  id: number;
  dataHora: Date;
  equipamento: string;
  estado: string;
  dataHoraFormatada?: string;
  equipamentoCurto?: string;
}

@Component({
  selector: 'app-tela_usuario',
  templateUrl: './tela_usuario.html',
  styleUrl: './tela_usuario.css'
})
export class TelaUsuario{
  solicitacoes: Solicitacao[] = [];

    //Pega dados do backend por http, mudar depois o link pro link definitivo

  constructor(private http: HttpClient) {
    this.carregarSolicitacoes();
  }

carregarSolicitacoes(){
  this.http.get<Solicitacao[]>('http://localhost:8080/api/solicitacoes').subscribe(
  {
    next: (dados) =>{
      this.solicitacoes = dados.map(s => ( //map ta transformando os objetos vindos do backend em objetos prontos pro frontend
        {
            ...s, //bruxaria do javascript, mas é oq ta funcionando
                  //aparentemente é um operador de spread, que insere os dados automatico no objeto
                  //que sintaxe horrível de ver...

            dataHora: new Date(s.dataHora),
            dataHoraFormatada: this.formatarDataHora(
              new Date(s.dataHora)
            ),
            equipamentoCurto: this.limitarTexto(s.equipamento, 30)
          }));

          // ordena por data/hora
          this.solicitacoes.sort((a, b) => a.dataHora.getTime() - b.dataHora.getTime());
        },
        error: (erro) => {
          console.error('Erro ao buscar solicitações:', erro);
        }
      });
  }

  //formatação de data para dia/mes/ano hora/minuto
  //já que o padrão não vem assim
  formatarDataHora(data: Date): string {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
  }

  //limita o número de caracteres conforme requisitos
  limitarTexto(texto: string, limite: number): string {
    return texto.length > limite ? texto.substring(0, limite) : texto;
  }



//ações
visualizar(id: number) {
  // Não sei como vai ser essa parte ainda, talvez vai vandar pra outra página? sla
  alert(`Visualizar detalhes da solicitação ${id}`);
}

aprovarRejeitar(id: number) {
  this.http.post(`http://localhost:8080/api/solicitacoes/${id}/aprovar-rejeitar`, {}) //mudar link para o definitivo depois
    .subscribe({
      next: () => {
        alert(`Solicitação ${id} foi aprovada/rejeitada.`);
        this.carregarSolicitacoes(); // recarrega lista após ação
      },
      error: (erro) => {
        console.error(erro);
        alert(`Erro ao aprovar/rejeitar solicitação ${id}`);
      }
    });
}

resgatar(id: number) {
  this.http.post(`http://localhost:8080/api/solicitacoes/${id}/resgatar`, {}) //mudar link para o definitivo depois
    .subscribe({
      next: () => {
        alert(`Solicitação ${id} foi resgatada.`);
        this.carregarSolicitacoes(); // recarrega lista após ação
      },
      error: (erro) => {
        console.error(erro);
        alert(`Erro ao resgatar solicitação ${id}`);
      }
    });
}

pagar(id: number) {
  this.http.post(`http://localhost:8080/api/solicitacoes/${id}/pagar`, {}) //mudar link para o definitivo depois
    .subscribe({
      next: () => {
        alert(`Solicitação ${id} foi paga com sucesso.`);
        this.carregarSolicitacoes(); // recarrega lista após ação
      },
      error: (erro) => {
        console.error(erro);
        alert(`Erro ao pagar solicitação ${id}`);
      }
    }
  );
}
}