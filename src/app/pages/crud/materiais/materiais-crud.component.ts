import { Component, Injector } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { EnumOption } from 'src/app/misc/enums/comum.enum';
import { InheritanceActionComponent } from 'src/app/misc/inheritance/inheritance-action.component';
import { ApiService } from 'src/app/services/api.service';
import { MateriaisCrudService } from './materiais-crud.service';

@Component({
    selector: 'app-materiais-crud',
    templateUrl: './materiais-crud.component.html',
    styleUrls: ['./materiais-crud.component.scss']
})
export class MateriaisCrudComponent extends InheritanceActionComponent {

    file: any;

    constructor(injector: Injector,
        materiaisCrudService: MateriaisCrudService,
        private api: ApiService,
        private fireStorage: AngularFireStorage) {
        super(injector, materiaisCrudService)
    }

    /**
     * @description Ao confirmar é acionado essa função
     */
    formConfirmed() {
        if (this.option != EnumOption.Create && this.resourceForm.get("caminho").value && this.file) {
            this.fireStorage.ref(this.resourceForm.get("caminho").value).delete();
        }

        if (this.option != EnumOption.Delete) {
            if (this.file) {
                const ref = this.fireStorage.ref(this.resourceForm.get("caminho").value);
                ref.put(this.file);
            }
        }

        window.history.back();
    }

}
