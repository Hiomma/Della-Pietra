import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ComumService } from 'src/app/services/comum.service';
import { StorageService } from 'src/app/services/storage.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'janela-site',
    templateUrl: './janela-site.component.html',
    styleUrls: ['./janela-site.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class JanelaSiteComponent implements OnInit, OnDestroy {

    listMenu = [
        { name: "HOME", englishName: "HOME", routerLink: ["/"] },
        { name: "EMPRESA", englishName: "COMPANY", routerLink: ["/empresa"] },
        { name: "MATERIAIS", englishName: "MATERIALS", routerLink: ["/materiais"] },
        { name: "CONTATO", englishName: "CONTACT", routerLink: ["/contato"] },
    ]

    private unsub = new Subject();
    isPortuguese = true;

    width = self.innerWidth;

    isCollapsed = false;

    constructor(private router: Router,
        private storage: StorageService,
        private comum: ComumService) { }

    ngOnInit(): void {
        this.comum.changeLanguage$.pipe(takeUntil(this.unsub)).subscribe((language: boolean) => {
            this.isPortuguese = language;
        })
    }

    mudarPagina(pagina: string) {
        this.router.navigate([pagina]);
    }

    isSelected(route: string): boolean {
        return route === this.router.url;
    }

    mudarIdioma(idioma: string) {
        if (idioma == 'pt-br') {
            this.storage.setStorage("idioma", true);
            this.comum.changeLanguage$.next(true);
        } else {
            this.storage.setStorage("idioma", false);
            this.comum.changeLanguage$.next(false);
        }
    }

    ngOnDestroy() {
        this.unsub.next();
        this.unsub.complete();
    }
}
