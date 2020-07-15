import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { takeUntil } from 'rxjs/operators';
import { ComumService } from 'src/app/services/comum.service';
import { Subject } from 'rxjs';
import { NzCarouselComponent } from 'ng-zorro-antd';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    @ViewChild("carousel") carousel: NzCarouselComponent;

    height = self.innerHeight;
    width = self.innerWidth;

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

        this.api.getAll("carousel").then(async (carousel: Array<any>) => {
            for (let element of carousel[0][this.isPortuguese ? "carousel" : "carouselIngles"].sort((a, b) => { return a < b ? -1 : a > b ? 1 : 0; })) {
                const ref = this.fireStorage.ref(element);
                await ref.getDownloadURL().toPromise().then((data) => {
                    this.listCarousel.push(data);
                })
            }
        }).catch(error => {
            console.error(error);
        })
    }

    get alturaCarousel() {
        if (this.width < 700) {
            return this.height - 144
        } else if ((this.height - 262) < 513 && this.width > 1400) {
            return 513
        } else if ((this.height - 262) < 380 && this.width > 1000) {
            return 380
        } else {
            return this.height - 262
        }
    }

    moverEsquerda() {
        this.carousel.pre();
    }

    moverDireita() {
        this.carousel.next();
    }

    /**
    * @description Cancelar a copia das imagens
    * @param {MouseEvent} event
    */
    cancelarCopia(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
    }

}
