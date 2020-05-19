import { Injectable } from '@angular/core';
import { IActions, IMenu } from '../misc/interfaces/menu.interface';

@Injectable({
    providedIn: 'root'
})

export class MenuService {

    private _listMenu: Array<IMenu>;

    constructor() {
        this._listMenu = [
            { name: 'Materiais', icon: "experiment", routerLink: ["materiais"], actions: this.createActions("materiais") },
            { name: 'Contato', icon: "experiment", routerLink: ["contato"], actions: this.createActions("contato") },
            { name: 'Mensagens', icon: "experiment", routerLink: ["mensagens"], actions: this.createActions("mensagens") },
        ];

    }

    get listMenu() {
        return this._listMenu;
    }

    /**
     * @description Monta a rota automaticamente
     * @param nomeRota Nome da rota que será chamada no outlet cadastro
     */
    createActions(nomeRota: string): Array<IActions> {
        let array: Array<IActions> = [
            { name: 'Adicionar', routerLink: [`/crud/${nomeRota}/${nomeRota}`], action: 1 },
            { name: 'Alterar', routerLink: [`/crud/${nomeRota}/${nomeRota}`], action: 2 },
            { name: 'Excluir', routerLink: [`/crud/${nomeRota}/${nomeRota}`], action: 3 },
        ];

        return array;
    }
}