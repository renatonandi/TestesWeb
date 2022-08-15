import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';

import { TabelaComponent } from './tabela.component';

@NgModule({
  declarations: [TabelaComponent],
  imports: [
    CommonModule,

    ButtonModule,
    InputTextModule,
    TableModule,
    ConfirmDialogModule,
    TooltipModule,
  ],
  exports: [TabelaComponent],
})
export class TabelaModule {}
