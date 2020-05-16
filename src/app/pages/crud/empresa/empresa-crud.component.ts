import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { EmpresaCrudService } from './empresa-crud.service';

@Component({
    selector: 'app-empresa-crud',
    templateUrl: './empresa-crud.component.html',
    styleUrls: ['./empresa-crud.component.scss']
})
export class EmpresaCrudComponent {

    file: any;
    resourceForm: FormGroup;
    listCarousel = [];

    constructor(
        private empresaCrudService: EmpresaCrudService,
        private route: ActivatedRoute,
        private fireStorage: AngularFireStorage) {
    }

    ngOnInit() {
        this.route.data.pipe(take(1)).subscribe((resource: any) => {
            this.resourceForm = this.empresaCrudService.getFormGroup();
            this.empresaCrudService.setValor(this.resourceForm, resource?.crud[0]);
            this.empresaCrudService.setValoresDefaults(this.resourceForm);
        });
    }
}
