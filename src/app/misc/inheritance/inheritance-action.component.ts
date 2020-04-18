import { Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { EnumOption } from '../enums/comum.enum';
import { InheritanceService } from './inheritance.service';

export abstract class InheritanceActionComponent implements OnInit {

    /** @description ResourceForm para preencher os dados automaticamentes */
    resourceForm: FormGroup;

    /** @description Opção selecionada */
    option: number;

    /** @description Opção que irá ser mostrado ao lado do Titulo */
    optionTitle: string;

    /** @description Importar Componentes */
    protected route: ActivatedRoute;

    constructor(
        injector: Injector,
        public resourceService: InheritanceService) {

        this.route = injector.get(ActivatedRoute);
    }

    /** @description Carrega  */
    ngOnInit(): void {
        this.resourceForm = this.resourceService.getFormGroup();
        this.loadResource();
    }

    /** @description Pega os valores e joga para o FormGroup automaticamente */
    loadResource() {
        this.route.params.pipe(take(1)).subscribe((params: any) => { this.option = parseFloat(params.option) });

        this.route.data.pipe(take(1)).subscribe((resource: any) => {
            if (this.option == EnumOption.Create) {
                this.resourceService.setValoresDefaults(this.resourceForm);
                this.resourceForm.get("uid").disable();
            } else if ([EnumOption.Update].includes(this.option)) {
                this.resourceService.setValor(this.resourceForm, resource?.crud);
                this.resourceForm.get("uid").disable();
                this.resourceService.setValoresDefaults(this.resourceForm);
            } else if (this.option == EnumOption.Delete || this.option == EnumOption.Read) {
                this.resourceService.setValor(this.resourceForm, resource?.crud);
                this.resourceForm.disable();
            }
        });

        this.optionTitle = (this.option == EnumOption.Create) ? 'Adicionar' : (this.option == EnumOption.Update) ? 'Alterar' : (this.option == EnumOption.Delete) ? 'Excluir' : 'Consultar';
    }
}
