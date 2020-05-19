import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-materiais',
    template: `
    <janela>
    <inheritance table="materiais"
        [listColumns]="listColumns"></inheritance>
    </janela>
    `,

})
export class MateriaisListaComponent implements OnInit {

    listConteudos = [];

    listColumns = [
        { name: "Nome", width: "45%", value: "nome" },
        { name: "Caminho", width: "45%", value: "caminho" },
    ]

    constructor() { }

    ngOnInit(): void {
    }

}
