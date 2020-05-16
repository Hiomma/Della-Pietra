import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    //Transformar user$ para uma variavel que contenha o usuario/empresa, e deixa-lo de forma asyncrona para o auth guard passar
    usuario: any;

    constructor(
        private angularAuth: AngularFireAuth,
        private storage: StorageService,
    ) {
        this.verifyUser();
    }

    async login(objeto: { userName: string, password: string }) {
        return new Promise((resolve, reject) => {
            this.angularAuth.auth.signInWithEmailAndPassword(objeto.userName, objeto.password).then(() => {
                this.verifyUser().then(user => {
                    resolve(user);
                });
            }).catch((error) => {
                reject(error);
                console.error(error);
            });
        })
    }

    verifyUser() {
        return new Promise((resolve, reject) => {
            this.angularAuth.authState.subscribe(user => {
                if (user) {
                    this.usuario = user;
                    this.storage.setStorage("usuario", this.usuario);
                    resolve();
                } else {
                    reject();
                }
            })
        });
    }

    logout() {
        this.usuario = null;
        this.storage.eraseStorage();
        return this.angularAuth.auth.signOut();
    }
}
