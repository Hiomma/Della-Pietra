import { Component, OnInit } from '@angular/core';
import { MenuService } from './services/menu.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';

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
        private auth: AuthService) {
    }

    ngOnInit() {
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