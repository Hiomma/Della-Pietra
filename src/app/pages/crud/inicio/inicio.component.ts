import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { HomeCrudService } from './home-crud.service';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

    resourceForm: FormGroup;

    constructor(
        private homeCrudService: HomeCrudService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.route.data.pipe(take(1)).subscribe((resource: any) => {
            this.resourceForm = this.homeCrudService.getFormGroup();
            this.homeCrudService.setValor(this.resourceForm, resource?.crud[0]);
            this.homeCrudService.setValoresDefaults(this.resourceForm);
        });
    }

}
