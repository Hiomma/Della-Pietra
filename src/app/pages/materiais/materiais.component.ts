import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ComumService } from 'src/app/services/comum.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { VisualizarMaterialComponent } from './visualizar-material/visualizar-material.component';

@Component({
    selector: 'app-materiais',
    templateUrl: './materiais.component.html',
    styleUrls: ['./materiais.component.scss']
})
export class MateriaisComponent implements OnInit {

    listMateriais: Array<any> = [];

    private unsub = new Subject();
    isPortuguese = true;

    constructor(private api: ApiService,
        private comum: ComumService,
        private modal: NzModalService,
        private fireStorage: AngularFireStorage) { }

    ngOnInit(): void {
        this.comum.changeLanguage$.pipe(takeUntil(this.unsub)).subscribe((language: boolean) => {
            this.isPortuguese = language;
        })

        this.api.getAll("materiais").then((listMateriais: Array<any>) => {
            listMateriais.forEach(element => {
                const ref = this.fireStorage.ref(element.caminho);
                ref.getDownloadURL().subscribe((data) => {
                    element.url = data
                    this.listMateriais.push(element);
                })
            })
        }).catch(error => {
            console.error(error);
        })
    }

    verChapa(material: any) {
        const modal: NzModalRef = this.modal.create({
            nzTitle: material.nome,
            nzContent: VisualizarMaterialComponent,
            nzComponentParams: {
                material: material
            },
            nzWrapClassName: "centralizar",
            nzWidth: "70%",
            nzFooter: [
                {
                    label: 'Voltar',
                    type: 'primary',
                    onClick: () => modal.destroy()
                },
            ]
        });
    }

}
