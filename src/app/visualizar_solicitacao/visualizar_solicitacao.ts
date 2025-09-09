import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Solicitacao {
  id: number;
  dataHora: Date;
  equipamento: string;
  estado: string;
  dataHoraFormatada?: string;
  equipamentoCurto?: string;
}

@Component({
  selector: 'app-visualizar_solicitacao',
  templateUrl: './visualizar_solicitacao.html',
  styleUrls: ['./visualizar_solicitacao.css']
})
export class VisualizarDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<VisualizarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Solicitacao
  ) {}

  fechar(): void {
    this.dialogRef.close();
  }
}