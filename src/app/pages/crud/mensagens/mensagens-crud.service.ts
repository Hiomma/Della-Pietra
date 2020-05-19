import { Injectable, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InheritanceService } from 'src/app/misc/inheritance/inheritance.service';

@Injectable({
    providedIn: 'root'
})

export class MensagensCrudService extends InheritanceService {

    constructor(
        private formBuilder: FormBuilder,
        injector: Injector) {

        super(injector);
    }

    getFormGroup(): FormGroup {
        return this.formBuilder.group({
            uid: [],
            mensagem: [null, [Validators.required, Validators.maxLength(9000)]],
            titulo: [null, [Validators.required, Validators.maxLength(2000)]],
            nome: [null, [Validators.required, Validators.maxLength(2000)]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(2000)]],
            telefone: [null, [Validators.required, Validators.maxLength(20)]],
        })
    }

    setValoresDefaults(resourceForm: FormGroup): void {
        this.setValoresDisable(resourceForm);
    }

    setValoresDisable(resourceForm: FormGroup): void {
    }
}
