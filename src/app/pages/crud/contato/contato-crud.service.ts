import { Injectable, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InheritanceService } from 'src/app/misc/inheritance/inheritance.service';

@Injectable({
    providedIn: 'root'
})

export class ContatoCrudService extends InheritanceService {

    constructor(
        private formBuilder: FormBuilder,
        injector: Injector) {

        super(injector);
    }

    getFormGroup(): FormGroup {
        return this.formBuilder.group({
            uid: [],
            contatos: [null, [Validators.required, Validators.maxLength(4000)]],
        })
    }

    setValoresDefaults(resourceForm: FormGroup): void {
        this.setValoresDisable(resourceForm);
    }

    setValoresDisable(resourceForm: FormGroup): void {
    }
}
