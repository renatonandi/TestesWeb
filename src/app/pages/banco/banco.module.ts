import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BancoComponent } from './banco.component';
import { FormularioModule } from './components/formulario/formulario.module';
import { TabelaModule } from './components/tabela/tabela.module';

@NgModule({
  declarations: [BancoComponent],
  imports: [CommonModule, FormularioModule, TabelaModule],
})
export class BancoModule {}
