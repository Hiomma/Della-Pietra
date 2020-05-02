import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class ComumService {

    /** @description Observer que controla a abertura e o fechamento de uma página */
    closedPage$ = new BehaviorSubject<any>(null);

    /** @description Observer que controla a abertura e o fechamento de uma página */
    changeLanguage$ = new BehaviorSubject<any>(this.storage.getStorage("idioma") ?? true);

    constructor(private storage: StorageService) { }
}