import { Injectable } from '@angular/core';
import { IActions, IMenu } from '../misc/interfaces/menu.interface';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})

export class MenuService {

    private _listMenu: Array<IMenu>;

    constructor(private storage: StorageService) {
        this._listMenu = [
            { name: 'Carreiras', icon: "experiment", routerLink: ["carreiras"], actions: this.createActions("carreiras"), isEmpresa: false },
            { name: 'Concursos', icon: "profile", routerLink: ["concursos"], actions: this.createActions("concursos"), isEmpresa: false },
            { name: 'Conteúdos Programáticos', icon: "schedule", routerLink: ["conteudos"], actions: this.createActions("conteudos"), isEmpresa: true },
            { name: 'Empresas', icon: "bank", routerLink: ["empresas"], actions: this.createActions("empresas"), isEmpresa: false },
            { name: 'Ofertas', icon: "tags", routerLink: ["ofertas"], actions: this.createActions("ofertas"), isEmpresa: true },
            { name: 'Professores', icon: "usergroup-add", routerLink: ["professores"], actions: this.createActions("professores"), isEmpresa: true },
            { name: 'Usuários', icon: "form", routerLink: ["usuarios"], actions: this.createActions("usuarios"), isEmpresa: false },
        ];

    }

    get listMenu() {
        if (this.storage.getStorage("empresa")) {
            return this._listMenu.filter(element => element.isEmpresa == true);
        } else {
            return this._listMenu;
        }
    }

    /**
     * @description Monta a rota automaticamente
     * @param nomeRota Nome da rota que será chamada no outlet cadastro
     */
    createActions(nomeRota: string): Array<IActions> {
        let array: Array<IActions> = [
            { name: 'Adicionar', routerLink: [nomeRota, { outlets: { cadastro: [nomeRota, 1, ''] } }], },
            { name: 'Alterar', routerLink: [nomeRota, { outlets: { cadastro: [nomeRota, 2, ''] } }], },
            { name: 'Excluir', routerLink: [nomeRota, { outlets: { cadastro: [nomeRota, 3, ''] } }], },
        ];

        return array;
    }
}