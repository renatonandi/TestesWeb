import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DialogService } from 'primeng/dynamicdialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ApiInterceptor } from './config/api.interceptor';

import { MenuModule } from './components/menu/menu.module';
import { PagesModule } from './pages/pages.module';

import pt from '@angular/common/locales/pt';

registerLocaleData(pt, 'pt-BR');

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    ToastModule,
    BreadcrumbModule,

    MenuModule,
    PagesModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    MessageService,
    DialogService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
