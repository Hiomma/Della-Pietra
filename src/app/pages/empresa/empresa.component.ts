import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ComumService } from 'src/app/services/comum.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-empresa',
    templateUrl: './empresa.component.html',
    styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

    listCarousel: Array<any> = [];
    textoEmpresa: { texto: string, texto_ingles: string };

    width = self.innerWidth;

    private unsub = new Subject();
    isPortuguese = true;

    constructor(private api: ApiService,
        private comum: ComumService,
        private fireStorage: AngularFireStorage) { }

    ngOnInit(): void {
        this.comum.changeLanguage$.pipe(takeUntil(this.unsub)).subscribe((language: boolean) => {
            this.isPortuguese = language;
        })


        this.api.getAll("empresa").then((empresa: { texto: string, texto_ingles: string, carousel: [] }) => {
            empresa = empresa[0];
            this.textoEmpresa = { texto: empresa.texto, texto_ingles: empresa.texto_ingles }

            empresa.carousel.forEach(element => {
                const ref = this.fireStorage.ref(element);
                ref.getDownloadURL().subscribe((data) => {
                    this.listCarousel.push(data);
                })
            })
        }).catch(error => {
            console.error(error);
        })
    }

}
