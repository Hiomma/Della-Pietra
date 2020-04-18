import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
    selector: 'app-materiais',
    templateUrl: './materiais.component.html',
    styleUrls: ['./materiais.component.scss']
})
export class MateriaisComponent implements OnInit {

    listMateriais: Array<any> = [];

    constructor(private api: ApiService,
        private fireStorage: AngularFireStorage) { }

    ngOnInit(): void {
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

}
