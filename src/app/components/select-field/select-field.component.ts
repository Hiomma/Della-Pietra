import { Component, ElementRef, Input, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'selectField',
    templateUrl: './select-field.component.html',
    styleUrls: ['./select-field.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SelectFieldComponent {

    /** @description Campo que está sendo manipulado */
    @Input() field: string;

    /** @description Label do Select */
    @Input() label: string;

    /** @description Control do Select */
    @Input() control: any;

    /** @description Caso é multiplo ou não */
    @Input() isMultiple: boolean = false;

    /** @description Lista dos objetos */
    @Input() listOptions: any;

    /** @description Caso true retorna o objeto inteiro */
    @Input() returnObject: boolean = false;

    /** @description Variavel auxiliar, contem a string com o valor do erro */
    error: string = "";

    /**@description Variavel que identifica se o campo é required ou não */
    required: boolean = false;

    constructor() { }

    ngOnInit() {
        if (!this.control) {
            this.control = new FormControl({ value: null, disabled: true })
        }

        // Verifica se o select é requerido
        if (this.control.validator) {
            const validator = this.control.validator({} as AbstractControl);
            if (validator && validator.required) {
                this.required = true;
            }
        }
    }

}
