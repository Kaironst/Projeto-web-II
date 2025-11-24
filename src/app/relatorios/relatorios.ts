import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatDatepickerModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatDivider,
    ReactiveFormsModule
  ],
  templateUrl: './relatorios.html',
  styleUrl: './relatorios.css'
})
export class RelatoriosComponent {
  
  http = inject(HttpClient);
  
  periodoForm = new FormGroup({
    inicio: new FormControl(null),
    fim: new FormControl(null)
  });

  baixarRelatorioPeriodo() {
    let params = new HttpParams();
    
    const inicioVal = this.periodoForm.value.inicio;
    const fimVal = this.periodoForm.value.fim;

    if (inicioVal) {
      params = params.set('inicio', this.formatarData(inicioVal));
    }
    if (fimVal) {
      params = params.set('fim', this.formatarData(fimVal));
    }

    this.http.get('http://localhost:8080/api/relatorios/receitas-periodo', {
      params: params,
      responseType: 'blob'
    }).subscribe(blob => {
      this.downloadFile(blob, 'receitas_periodo.pdf');
    });
  }

  baixarRelatorioCategoria() {
    this.http.get('http://localhost:8080/api/relatorios/receitas-categoria', {
      responseType: 'blob'
    }).subscribe(blob => {
      this.downloadFile(blob, 'receitas_categoria.pdf');
    });
  }

  private formatarData(data: Date): string {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  private downloadFile(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}