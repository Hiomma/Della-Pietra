import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'janela-site',
    templateUrl: './janela-site.component.html',
    styleUrls: ['./janela-site.component.scss']
})
export class JanelaSiteComponent implements OnInit {

    listMenu = [
        { name: "Home", routerLink: ["/"] },
        { name: "Empresa", routerLink: ["/empresa"] },
        { name: "Materiais", routerLink: ["/materiais"] },
        { name: "Contato", routerLink: ["/contato"] },
    ]

    year = new Date().getFullYear();

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    mudarPagina(pagina: string) {
        this.router.navigate([pagina]);
    }

    isSelected(route: string): boolean {
        return route === this.router.url;
    }

}
