import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-materiais',
    template: `
    <janela>
    <inheritance table="mensagens"
        [listColumns]="listColumns"></inheritance>
    </janela>
    `,

})
export class MensagensListaComponent implements OnInit {

    listConteudos = [];

    listColumns = [
        { name: "Título", width: "20%", value: "titulo" },
        { name: "Nome", width: "20%", value: "nome" },
        { name: "E-mail", width: "20%", value: "email" },
        { name: "Telefone", width: "20%", value: "telefone" },
    ]

    constructor() { }

    ngOnInit(): void {
    }

}
