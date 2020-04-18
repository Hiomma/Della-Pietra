import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
    selector: 'app-contato',
    templateUrl: './contato.component.html',
    styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit {

    listCarousel: Array<any> = [];

    constructor(private api: ApiService,
        private fireStorage: AngularFireStorage) { }

    ngOnInit(): void {
        this.api.getAll("carousel").then((listCarousel: Array<any>) => {
            console.log(listCarousel)
            listCarousel.forEach(element => {
                const ref = this.fireStorage.ref(element.caminho);
                ref.getDownloadURL().subscribe((data) => {
                    this.listCarousel.push(data);
                })
            })
        }).catch(error => {
            console.error(error);
        })
    }

}
