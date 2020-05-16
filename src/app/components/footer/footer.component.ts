import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { EnumOption } from 'src/app/misc/enums/comum.enum';
import { ComumService } from 'src/app/services/comum.service';

@Component({
    selector: 'footer',
    templateUrl: "footer.component.html",
    styleUrls: ["footer.component.scss"],
})

export class FooterComponent {

    /** @description FormGroup que será modificado */
    @Input() formGroup: FormGroup;

    /** @description Opção escolhida pelo usuário (Create, Delete...) */
    @Input() option: EnumOption;

    /** @description Qual tabela sera inserida */
    @Input() table: string;

    /** @description Envia um evento ao Confirmar o cadastro */
    @Output() formConfirmed = new EventEmitter();

    constructor(private firestore: AngularFirestore,
        private comumService: ComumService,
        private message: NzMessageService) {
    }

    confirmar() {
        let body = this.formGroup.getRawValue();
        delete (body.uid);
        delete (body.senha);

        switch (this.option) {
            case EnumOption.Create:
                body.data_cadastro = new Date().toLocaleString();

                this.firestore.collection<any>(this.table).add(body).then((data: any) => {
                    this.formGroup.get("uid").setValue(data.id)
                    this.message.create("success", "Os dados foram incluídos com sucesso!");
                    this.formConfirmed.emit(this.formGroup);

                    this.comumService.closedPage$.next(null);
                }).catch(err => {
                    this.message.create("error", "Houve um erro ao incluir os dados. Tente novamente!");
                    console.error(err);
                })
                break;
            case EnumOption.Update:
                body.data_alteracao = new Date().toLocaleString();

                this.firestore.collection<any>(this.table).doc(this.formGroup.get("uid").value).update(body).then(() => {
                    this.message.create("success", "Os dados foram alterados com sucesso!");
                    this.formConfirmed.emit(this.formGroup);

                    this.comumService.closedPage$.next({ action: "update" });
                }).catch(err => {
                    this.message.create("error", "Houve um erro ao atualizar os dados. Tente novamente!");
                    console.error(err);
                })
                break;
            case EnumOption.Delete:
                this.firestore.collection<any>(this.table).doc(this.formGroup.get("uid").value).delete().then(() => {
                    this.message.create("success", "Os dados foram excluídos com sucesso!");
                    this.formConfirmed.emit(this.formGroup);

                    this.comumService.closedPage$.next(null);
                }).catch(err => {
                    this.message.create("error", "Houve um erro ao excluir os dados. Tente novamente!");
                    console.error(err);
                })
                break;
        }
    }

    voltar() {
        window.history.back();
    }
}