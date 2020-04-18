import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { getMaxLength } from 'src/app/misc/library';
import { Masks } from 'src/app/misc/validators/masks';
import { CustomValidators } from 'src/app/misc/validators/validators';

@Component({
    selector: 'inputField',
    templateUrl: './input-field.component.html',
    styleUrls: ['./input-field.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class InputFieldComponent {

    /** @description Nome do Campo */
    @Input() field: string;

    /** @description Descrição do Label */
    @Input() label: string;

    /** @description Descrição do placeholder */
    @Input() placeholder: string = "";

    /** @description Número de Rows para ativar o Text-area */
    @Input() rows: number;

    /** @description MaxLength quando o campo é representação de Numero ele se torna o MAX, quando é string é o tamanho do campo */
    @Input() max: number = 99;

    /** @description Caso true mostra o icone de Search no input */
    @Input() isSearch: boolean = false;

    /** @description Precisão é a quantidade de 0 após a virgula, só funciona no type I */
    @Input() precision: number;

    /** @description Control que contem o Reactive Forms do campo */
    @Input() control: FormControl;

    /** @description ID do campo */
    @Input() id: string;

    /** @description Quando é definido um type, é setado o auxTipo para escolher a mask do campo */
    @Input() type: string = "S"

    /** @description Mascara que será enviada para o input */
    mask: any = { mask: false };

    /** @description Type do Input */
    auxType = "text";

    /**@description Campo que define a mask inicializada */
    maskValue: string = "";

    /**@description Getter que retorna o erro para o tooltip */
    get erro() {
        if (this.control.invalid && this.control.enabled) {
            for (let nomeErro in this.control.errors) {
                this.error = CustomValidators.getErrorMsg(this.label, nomeErro, this.control.errors[nomeErro]);
                return this.error;
            }
        }
    }

    /** @description Variavel auxiliar, contem a string com o valor do erro */
    error: string = "";

    /**@description Variavel que identifica se o campo é required ou não */
    required: boolean = false;

    ngOnInit() {
        if (!this.control) {
            this.control = new FormControl({ value: null, disabled: true })
        }

        if (this.control.validator) {
            const validator = this.control.validator({} as AbstractControl);
            if (validator && validator.required) {
                this.required = true;
            }
        }

        this.escolherMascara();
    }

    /**
     * @description Função auxiliar para escolher mask pelo Tipo
     * @private
     */
    private escolherMascara() {
        switch (this.type) {
            case "T":
                this.mask = Masks.maskTempo();
                break;
            case "D":
                this.mask = Masks.maskData();
                break;
            case "D8":
                this.mask = Masks.maskData8();
                break;
            case "DH":
                this.mask = Masks.maskDataHora();
                break;
            case "P":
                this.mask = Masks.maskPorcentagem(this.precision);
                break;
            case "I":
                this.mask = Masks.maskInteiro(this.precision);
                break;
            case "N":
                this.mask = Masks.maskDinheiro(this.precision);
                break;
            case "CNPJ":
                this.mask = Masks.maskCNPJ();
                break;
            case "CPF":
                this.mask = Masks.maskCPF();
                break;
            case "C":
                this.mask = Masks.maskCodigo(getMaxLength(this.control));
                break;
            case "PW":
                this.auxType = "password";
                break;
            case "TEL":
                this.mask = Masks.maskTelefone();
                break;
            case "CEL":
                this.mask = Masks.maskCelular();
                break;
            case "CFOP":
                this.mask = Masks.maskCFOP();
                break;
            case "CEP":
                this.mask = Masks.maskCEP();
                break;
            case "color":
                this.auxType = "color";
                break;
            default:
                this.mask = Masks.maskMaxLength(getMaxLength(this.control));
                break;
        }

        if (this.mask.mask && !["P", "N", "I", "S", "URL"].includes(this.type)) {
            this.mask.guide = true; this.mask.placeholderChar = "_"
        }
    }

    onTouchedCb() {
        this.control.markAsTouched();
    }
}
