import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router, private storage: StorageService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {

        if (!this.storage.getStorage("usuario") && !this.storage.getStorage("empresa")) {
            this.router.navigate([""]);
            this.auth.logout();
            return false;
        } else {
            return true;
        }
    }
}