import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    /**
     * @description Salva algo algo dentro do localStorage
     * @param chave Id do objeto que está salvo no localStorage
     * @param objeto Objeto a ser salvo
     */
    setStorage(chave: string, objeto: any) {
        window.localStorage.setItem(chave, JSON.stringify(objeto));
    }

    /**
     * @description Retorna o Item desejado a partir da Chave
     * @param chave Id do objeto que está salvo no localStorage
     */
    getStorage(chave: string) {
        return JSON.parse(window.localStorage.getItem(chave));
    }

    /** @description Limpa todo o localstorage */
    eraseStorage() {
        window.localStorage.clear();
    }

    /**
     * @description Remove o Item desejado a partir da Chave
    * @param chave Id do objeto que está salvo no localStorage
    */
    removeStorage(chave: string) {
        window.localStorage.removeItem(chave);
    }
}
