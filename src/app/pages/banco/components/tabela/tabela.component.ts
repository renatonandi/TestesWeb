import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';

import { BancoModel } from 'src/app/model/banco-model';
import { BancoService } from 'src/app/service/banco.service';
import { LoadingService } from 'src/app/service/loading.service';
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss'],
})
export class TabelaComponent implements OnInit {
  @ViewChild('tabela', { static: true }) tabela!: Table;

  columns = [
    { field: 'codigo', header: 'Código', type: 'number' },
    { field: 'nome', header: 'Nome', type: 'string' },
    { field: 'tipo', header: 'Tipo', type: 'string' },
    { field: 'id', header: 'Ações', type: 'actions' },
  ];
  bancos: BancoModel[] = [];
  isLoading: boolean = false;

  constructor(
    private loadingService: LoadingService,
    private bancoService: BancoService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.reloadGrid();
  }
  openForm(value?: BancoModel): void {
    const ref = this.dialogService.open(FormularioComponent, {
      data: {
        value: value,
        reloadGrid: () => this.reloadGrid(),
      },
      header: value ? `Editar (${value.nome})` : 'Novo Registro',
    });
    ref.onClose.subscribe((reload: boolean) => {
      if (reload) {
        this.reloadGrid();
      }
    });
  }

  pesquisar(texto: string): void {
    this.tabela.filterGlobal(texto, 'contains');
  }

  excluir(banco: BancoModel): void {
    this.confirmationService.confirm({
      header: 'Deseja realmente excluir o registro?',
      message: 'Deseja realmente excluir o registro?',
      icon: 'pi pi-info-circle',
      rejectButtonStyleClass: 'p-button-text p-button-success',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        const sub = this.bancoService.excluir(banco.id).subscribe(() => {
          this.reloadGrid();
        });
        this.load(sub);
      },
    });
  }

  reloadGrid(): void {
    const sub = this.bancoService
      .consultar()
      .subscribe((model: BancoModel[]) => {
        this.bancos = model;
      });
    this.load(sub);
  }

  getRowValue(value: any, field: string): string {
    if (field.includes('.')) {
      const field0 = field.substring(0, field.indexOf('.'));
      return this.getRowValue(
        value[field0],
        field.substring(field.indexOf('.') + 1)
      );
    }
    return value[field];
  }

  private load(sub: Subscription): void {
    this.loadingService.load(sub, (x) => (this.isLoading = x));
  }
}
