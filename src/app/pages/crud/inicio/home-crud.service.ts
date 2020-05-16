import { Injectable, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InheritanceService } from 'src/app/misc/inheritance/inheritance.service';

@Injectable({
    providedIn: 'root'
})

export class HomeCrudService extends InheritanceService {

    constructor(
        private formBuilder: FormBuilder,
        injector: Injector) {

        super(injector);
    }

    getFormGroup(): FormGroup {
        return this.formBuilder.group({
            uid: [null],
            carousel: []
        })
    }

    setValoresDefaults(resourceForm: FormGroup): void {
        this.setValoresDisable(resourceForm);
    }

    setValoresDisable(resourceForm: FormGroup): void {
    }
}
