import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComumService } from 'src/app/services/comum.service';

@Component({
    selector: 'app-contato',
    templateUrl: './contato.component.html',
    styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit {

    listCarousel: Array<any> = [];

    contatos: any;

    resourceForm = this.formBuilder.group({
        nome: [null, [Validators.required, Validators.maxLength(100)]],
        email: [null, [Validators.required, Validators.maxLength(100), Validators.email]],
        titulo: [null, [Validators.required, Validators.maxLength(100)]],
        telefone: [null, [Validators.required, Validators.maxLength(100)]],
        mensagem: [null, [Validators.required, Validators.maxLength(1000)]],
    });

    private unsub = new Subject();
    isPortuguese = true;

    constructor(private api: ApiService,
        private formBuilder: FormBuilder,
        private comum: ComumService,
        private fireStorage: AngularFireStorage) { }

    ngOnInit(): void {
        this.comum.changeLanguage$.pipe(takeUntil(this.unsub)).subscribe((language: boolean) => {
            this.isPortuguese = language;
        })

        this.api.getAll("contato").then((contato: any[]) => {
            this.contatos = contato[0];
        }).catch(error => {
            console.error(error);
        })
    }
}
