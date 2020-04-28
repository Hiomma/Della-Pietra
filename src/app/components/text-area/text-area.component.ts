import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'textareaField',
    templateUrl: './text-area.component.html',
    styleUrls: ['./text-area.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class TextAreaComponent {

    /** @description Nome do Campo */
    @Input() field: string;

    /** @description Descrição do Label */
    @Input() label: string;

    /** @description Control que contem o Reactive Forms do campo */
    @Input() control: FormControl;

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

    }

    onTouchedCb() {
        this.control.markAsTouched();
    }
}
