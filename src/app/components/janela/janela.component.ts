import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'janela',
    templateUrl: './janela.component.html',
    styleUrls: ['./janela.component.scss']
})
export class JanelaComponent implements OnInit {

    isCollapsed = false;

    listMenu = [
        { name: 'Empresa', icon: "bank", routerLink: ["/crud/empresa"] },
        { name: 'Materiais', icon: "play-square", routerLink: ["/crud/materiais"] },
        { name: 'Contato', icon: "form", routerLink: ["/crud/contato"] },
    ];

    constructor(private router: Router,
        private auth: AuthService) {
    }

    ngOnInit(): void { }

    isSelected(route: string): boolean {
        return "/" + route === this.router.url;
    }

    toggleCollapsed(): void {
        this.isCollapsed = !this.isCollapsed;
    }

    logout() {
        this.router.navigate([{ outlets: { cadastro: null } }])
        this.auth.logout();
    }
}
