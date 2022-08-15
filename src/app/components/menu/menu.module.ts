import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuModule as MenuPrimeNgModule } from 'primeng/menu';

import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    MenuPrimeNgModule
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
