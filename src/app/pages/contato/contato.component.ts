import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-contato',
    templateUrl: './contato.component.html',
    styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit {

    listCarousel: Array<any> = [];

    resourceForm = this.formBuilder.group({
        descricao: [null, [Validators.required, Validators.maxLength(100)]],
        email: [null, [Validators.required, Validators.maxLength(100), Validators.email]],
        titulo: [null, [Validators.required, Validators.maxLength(100)]],
        telefone: [null, [Validators.required, Validators.maxLength(100)]],
        mensagem: [null, [Validators.required, Validators.maxLength(1000)]],
    });

    constructor(private api: ApiService,
        private formBuilder: FormBuilder,
        private fireStorage: AngularFireStorage) { }

    ngOnInit(): void {

    }
}
