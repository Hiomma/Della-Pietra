import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
    selector: 'app-empresa',
    templateUrl: './empresa.component.html',
    styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

    listCarousel: Array<any> = [];
    textoEmpresa: { texto: string, texto_ingles: string };

    constructor(private api: ApiService,
        private fireStorage: AngularFireStorage) { }

    ngOnInit(): void {
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
