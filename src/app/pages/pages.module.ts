import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home/home.module';
import { BancoModule } from './banco/banco.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HomeModule, BancoModule],
})
export class PagesModule {}
