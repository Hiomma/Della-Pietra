import { Component, Injector } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { EnumOption } from 'src/app/misc/enums/comum.enum';
import { InheritanceActionComponent } from 'src/app/misc/inheritance/inheritance-action.component';
import { ApiService } from 'src/app/services/api.service';
import { EmpresaCrudService } from './materiais-crud.service';

@Component({
    selector: 'app-materiais-crud',
    templateUrl: './materiais-crud.component.html',
    styleUrls: ['./materiais-crud.component.scss']
})
export class EmpresaCrudComponent extends InheritanceActionComponent {

    file: any;
    materiais: any;

    constructor(injector: Injector,
        materiaisCrudService: EmpresaCrudService,
        private api: ApiService,
        private fireStorage: AngularFireStorage) {
        super(injector, materiaisCrudService)
    }

    ngOnInit() {
        super.ngOnInit();

        this.api.getAll("materiais").then((data: Array<any>) => {
            this.materiais = data[0];
        }).catch(error => {
            console.error(error);
        })
    }

    /**
     * @description Ao confirmar é acionado essa função
     */
    formConfirmed() {
        if (this.option != EnumOption.Create && this.resourceForm.get("imagem").value) {
            this.fireStorage.ref(this.resourceForm.get("imagem").value).delete();
        }

        if (this.option != EnumOption.Delete) {
            if (this.file) {
                const ref = this.fireStorage.ref(this.resourceForm.get("imagem").value);
                ref.put(this.file);
            }
        }
    }

}
