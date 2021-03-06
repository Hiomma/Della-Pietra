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
    auxListMateriais: Array<any> = [];

    private unsub = new Subject();
    isPortuguese = true;

    filtro = "T";

    width = self.innerWidth;

    constructor(private api: ApiService,
        private comum: ComumService,
        private modal: NzModalService,
        private fireStorage: AngularFireStorage) { }

    ngOnInit(): void {
        this.comum.changeLanguage$.pipe(takeUntil(this.unsub)).subscribe((language: boolean) => {
            this.isPortuguese = language;
        })

        this.api.getAll("materiais").then(async (listMateriais: Array<any>) => {
            for (let element of listMateriais) {
                const ref = this.fireStorage.ref(element.caminho);
                await ref.getDownloadURL().toPromise().then((data) => {
                    element.url = data
                    this.auxListMateriais.push(element);
                })
            }

            this.mudarMateriais("T");
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
            nzWidth: "820px",
            nzFooter: [
                {
                    label: 'Voltar',
                    type: 'primary',
                    onClick: () => modal.destroy()
                },
            ]
        });
    }

    mudarMateriais(filtroSelecionado: string) {
        switch (filtroSelecionado) {
            case "T":
                this.listMateriais = this.auxListMateriais.concat([]).sort((a, b) => {
                    return a.codigo < b.codigo ? -1 : a.codigo > b.codigo ? 1 : 0;
                });
                break;
            case "B":
                this.listMateriais = this.auxListMateriais.filter(element => element.tipo == "B").sort((a, b) => {
                    return a.codigo < b.codigo ? -1 : a.codigo > b.codigo ? 1 : 0;
                })
                break;
            case "E":
                this.listMateriais = this.auxListMateriais.filter(element => element.tipo == "E").sort((a, b) => {
                    return a.codigo < b.codigo ? -1 : a.codigo > b.codigo ? 1 : 0;
                })
                break;
        }
    }
}
