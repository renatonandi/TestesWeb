import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { BancoService } from 'src/app/service/banco.service';
import { InputNumber } from 'primeng/inputnumber';
import { BancoModel } from 'src/app/model/banco-model';
import { LoadingService } from 'src/app/service/loading.service';
import { EnumTipoBanco } from 'src/app/enums/enum-tipo-banco';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  @ViewChild('inputCodigo') inputCodigo?: InputNumber;

  banco?: BancoModel;
  isLoading: boolean = false;
  tipos = [
    { name: 'Banco Comercial', code: EnumTipoBanco.COMERCIAL },
    { name: 'Banco de Investimento', code: EnumTipoBanco.INVESTIMENTO },
    {
      name: 'Banco de Desenvolvimento',
      code: EnumTipoBanco.DESENVOLVIMENTO,
    },
    { name: 'Banco Múltiplo', code: EnumTipoBanco.MULTIPLO },
  ];

  form: FormGroup = this.formBuilder.group({
    codigo: new FormControl(null, [Validators.required]),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    tipo: new FormControl(null, [Validators.required]),
  });

  codigo = this.form.controls['codigo'];
  nome = this.form.controls['nome'];
  tipo = this.form.controls['tipo'];

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private bancoService: BancoService
  ) {}

  ngOnInit(): void {
    this.banco = this.config.data.value;
    if (this.banco) {
      this.codigo.setValue(this.banco.codigo);
      this.nome.setValue(this.banco.nome);
      this.tipo.setValue(this.banco.tipo);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.banco) {
        const sub = this.bancoService
          .alterar(this.banco.id, this.form.getRawValue())
          .subscribe(() => this.ref.close(true));
        this.load(sub);
      } else {
        const sub = this.bancoService
          .cadastrar(this.form.getRawValue())
          .subscribe(() => {
            this.config.data.reloadGrid();
            this.form.reset();
            this.inputCodigo?.input.nativeElement.focus();
          });
        this.load(sub);
      }
    }
  }

  private load(sub: Subscription): void {
    this.loadingService.load(sub, (x) => (this.isLoading = x));
  }
}
