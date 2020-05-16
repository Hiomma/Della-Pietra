import { Component, Injector } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { EnumOption } from 'src/app/misc/enums/comum.enum';
import { InheritanceActionComponent } from 'src/app/misc/inheritance/inheritance-action.component';
import { ApiService } from 'src/app/services/api.service';
import { ContatoCrudService } from './contato-crud.service';

@Component({
    selector: 'app-contato-crud',
    templateUrl: './contato-crud.component.html',
    styleUrls: ['./contato-crud.component.scss']
})
export class ContatoCrudComponent extends InheritanceActionComponent {

    file: any;
    contato: any;

    constructor(injector: Injector,
        contatoCrudService: ContatoCrudService,
        private api: ApiService,
        private fireStorage: AngularFireStorage) {
        super(injector, contatoCrudService)
    }

    ngOnInit() {
        super.ngOnInit();

        this.api.getAll("contato").then((data: Array<any>) => {
            this.contato = data[0];
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
