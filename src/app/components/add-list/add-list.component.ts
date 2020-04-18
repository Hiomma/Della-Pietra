import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Component({
    selector: 'addList',
    templateUrl: './add-list.component.html',
    styleUrls: ['./add-list.component.scss']
})
export class AddListComponent implements OnInit {

    /** @description Controle de Loading */
    loading = false;

    /** @description Aux Control para a lista */
    auxControl = new FormControl(null);

    /** @description Control para a lista */
    @Input() control: FormArray;

    /** @description Tabela que está apontado */
    @Input() table: string;

    /** @description Nome da Lista */
    @Input() name: string;

    @Output() getAdd = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    /** @description Ao adicionar envia para o componente pai a lista */
    add() {
        this.getAdd.emit(this.auxControl);
        this.auxControl.reset();
    }
}
