import { Injector, OnDestroy } from "@angular/core";
import { FormArray, FormGroup } from '@angular/forms';


export abstract class InheritanceService implements OnDestroy {

    /** @description guarda o interval para ser destruido */
    private interval: any;

    constructor(protected injector: Injector) {
    }

    abstract getFormGroup(): FormGroup;
    abstract setValoresDefaults(resourceForm: FormGroup): void;
    abstract setValoresDisable(resourceForm: FormGroup): void;

    setValor(resourceForm: FormGroup, data: any): void {
        resourceForm.patchValue(data);
    }

    /**
     *@description Marca todos os campos como tocados
     * @param {*} formGroup
     * @memberof BaseResourceService
     */
    markFormGroupTouched(formGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        })
    }

    resetForm(resourceForm: FormGroup): void {
        resourceForm.reset();
    }

    /**
     * @description Adiciona uma nova linha no resourceForm escolhido
     * @param {FormGroup} resourceForm ResourceForm escolhido
     * @param {*} dadosAux Dados auxiliares para preenchimento do Resource
     */
    novaLinhaArray(resourceForm: FormGroup, dadosAux?: any) { }

    /**
     * @description Remove os Validators para poder ativar o botão
     * @param {FormGroup} listControl FormGroup
     * @param {Array<string>} nomes Nome dos Campos
     */
    public removerValidators(listControl: FormGroup, nomes: Array<string>) {
        for (let aux of nomes) {
            listControl.get(aux).clearValidators();
            listControl.get(aux).clearAsyncValidators();
            listControl.get(aux).updateValueAndValidity();
        }
    }

    /**
     * @description Função para debugar FormGroup que está com os campos inválidos
     * @param resourceForm FormGruop que será analisado
     * @param tempo Tempo que o SetInterval vai dar console.log
     */
    getInvalidControls(resourceForm: FormGroup, tempo: number = 5000) {
        this.interval = setInterval(() => {
            let invalid = [];
            for (const name in resourceForm.controls) {
                if (resourceForm.controls[name].invalid) {
                    invalid.push({ nome: name, valor: resourceForm.controls[name].value, formControl: resourceForm.controls[name] });
                }
            }

            console.log(invalid)
        }, tempo)

    }

    /**
     * @description Limpa o array informado
     * @param {FormGroup} resourceForm ResourceForm que contem o array
     * @param {string} nomeArray Nome do array
     */
    limparArray(resourceForm: FormGroup, nomeArray: string): void {
        let tamanho = (resourceForm.get(nomeArray) as FormArray).length;

        for (let i = 0; i < tamanho; i++) {
            (resourceForm.get(nomeArray) as FormArray).removeAt(0);
        }
    }

    ngOnDestroy() {
        clearInterval(this.interval)
    }
}

