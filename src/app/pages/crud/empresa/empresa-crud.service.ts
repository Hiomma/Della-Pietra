import { Injectable, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InheritanceService } from 'src/app/misc/inheritance/inheritance.service';

@Injectable({
    providedIn: 'root'
})

export class EmpresaCrudService extends InheritanceService {

    constructor(
        private formBuilder: FormBuilder,
        injector: Injector) {

        super(injector);
    }

    getFormGroup(): FormGroup {
        return this.formBuilder.group({
            uid: [null],
            texto: [null, [Validators.required, Validators.maxLength(2000)]],
            texto_ingles: [null, [Validators.required, Validators.maxLength(2000)]],
            carousel: []
        })
    }

    setValoresDefaults(resourceForm: FormGroup): void {
        this.setValoresDisable(resourceForm);
    }

    setValoresDisable(resourceForm: FormGroup): void {
    }
}
