import { Component, OnInit } from '@angular/core';
import { MenuService } from './services/menu.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { ComumService } from './services/comum.service';
import { ApiService } from './services/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

    isCollapsed = false;

    constructor(private menu: MenuService,
        private router: Router,
        private storage: StorageService,
        private comum: ComumService,
        private api: ApiService,
        private auth: AuthService) {
    }

    async ngOnInit() {
        if (!this.storage.getStorage("ultimaVisita") || this.storage.getStorage("ultimaVisita") != new Date().toLocaleDateString()) {
            this.storage.setStorage("ultimaVisita", new Date().toLocaleDateString())
            let visita = await this.api.getVisita()
            await this.api.updateVisita(++visita.visitas)
        }
    }

    get listMenu() {
        return this.menu.listMenu;
    }

    get username() {
        let user = this.storage.getStorage("usuario");
        return user ? user.email : this.storage.getStorage("empresa")?.[0].nome;
    }

    toggleCollapsed(): void {
        this.isCollapsed = !this.isCollapsed;
    }

    logout() {
        this.router.navigate([""]);
        this.auth.logout();
    }

}