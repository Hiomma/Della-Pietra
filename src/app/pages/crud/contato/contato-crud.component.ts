import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ContatoCrudService } from './contato-crud.service';

@Component({
    selector: 'app-contato-crud',
    templateUrl: './contato-crud.component.html',
    styleUrls: ['./contato-crud.component.scss']
})
export class ContatoCrudComponent {

    resourceForm: FormGroup;

    constructor(
        private contatoCrudService: ContatoCrudService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.route.data.pipe(take(1)).subscribe((resource: any) => {
            this.resourceForm = this.contatoCrudService.getFormGroup();
            this.contatoCrudService.setValor(this.resourceForm, resource?.crud[0]);
            this.contatoCrudService.setValoresDefaults(this.resourceForm);
        });
    }
}
