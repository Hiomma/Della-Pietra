import { Component, Injector } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { EnumOption } from 'src/app/misc/enums/comum.enum';
import { InheritanceActionComponent } from 'src/app/misc/inheritance/inheritance-action.component';
import { ApiService } from 'src/app/services/api.service';
import { MensagensCrudService } from './mensagens-crud.service';

@Component({
    selector: 'app-mensagens-crud',
    templateUrl: './mensagens-crud.component.html',
    styleUrls: ['./mensagens-crud.component.scss']
})
export class MensagensCrudComponent extends InheritanceActionComponent {

    file: any;
    mensagens: any;

    constructor(injector: Injector,
        mensagensCrudService: MensagensCrudService,
        private api: ApiService,
        private fireStorage: AngularFireStorage) {
        super(injector, mensagensCrudService)
    }

    ngOnInit() {
        super.ngOnInit();

        this.api.getAll("mensagens").then((data: Array<any>) => {
            this.mensagens = data[0];
        }).catch(error => {
            console.error(error);
        })
    }

    /**
     * @description Ao confirmar é acionado essa função
     */
    formConfirmed() {
        window.history.back();
    }

}
