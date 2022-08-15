import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, take, tap } from "rxjs";

import { MessageService } from 'primeng/api';

import { BancoModel } from '../model/banco-model';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  private baseUrl = "/banco";

  constructor(private http: HttpClient, private messageService: MessageService) { }

  consultar(): Observable<BancoModel[]> {
    return this.http.get<BancoModel[]>(`${this.baseUrl}`).pipe(take(1))
  }

  cadastrar(model: BancoModel): Observable<BancoModel> {
    return this.http.post<BancoModel>(`${this.baseUrl}`, model)
      .pipe(
        tap(() => this.success('Banco Cadastrado com Sucesso!')),
        take(1)
      );
  }

  alterar(id: string, model: BancoModel): Observable<BancoModel> {
    return this.http.put<BancoModel>(`${this.baseUrl}/${id}`, model)
      .pipe(
        tap(() => this.success('Banco Alterado com Sucesso!')),
        take(1)
      );
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(
        tap(() => this.success('Banco Excluido com Sucesso!')),
        take(1)
      );
  }

  private success(msg: string): void {
    this.messageService.add({
      severity: 'success',
      summary: msg
    });
  }
}
