import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ComumService {

    /** @description Observer que controla a abertura e o fechamento de uma página */
    closedPage$ = new BehaviorSubject<any>(null);

    constructor() { }
}