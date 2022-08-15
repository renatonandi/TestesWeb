import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

import { FormularioComponent } from './formulario.component';

@NgModule({
  declarations: [FormularioComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
  ],
  entryComponents: [FormularioComponent],
})
export class FormularioModule {}
