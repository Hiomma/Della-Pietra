import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
