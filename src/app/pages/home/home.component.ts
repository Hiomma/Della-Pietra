import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { takeUntil } from 'rxjs/operators';
import { ComumService } from 'src/app/services/comum.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    listCarousel: Array<any> = [];

    private unsub = new Subject();
    isPortuguese = true;

    constructor(private api: ApiService,
        private comum: ComumService,
        private fireStorage: AngularFireStorage) { }

    ngOnInit(): void {
        this.comum.changeLanguage$.pipe(takeUntil(this.unsub)).subscribe((language: boolean) => {
            this.isPortuguese = language;

            this.carregarImagens();
        })
    }

    private carregarImagens() {
        this.listCarousel = [];

        this.api.getAll("carousel").then((listCarousel: Array<any>) => {
            listCarousel.forEach(element => {
                const ref = this.fireStorage.ref(this.isPortuguese ? element.caminho : element.caminhoIngles);
                ref.getDownloadURL().subscribe((data) => {
                    this.listCarousel.push(data);
                })
            })
        }).catch(error => {
            console.error(error);
        })
    }

}
