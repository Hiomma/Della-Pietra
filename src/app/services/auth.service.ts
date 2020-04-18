import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NzMessageService } from 'ng-zorro-antd';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    //Transformar user$ para uma variavel que contenha o usuario/empresa, e deixa-lo de forma asyncrona para o auth guard passar

    usuario: any;
    empresa: any;
    isEmpresa$ = new BehaviorSubject(true);

    constructor(
        private angularAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private message: NzMessageService,
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

                    Promise.all([
                        this.afs.doc<any>(`usuarios/${user.uid}`).valueChanges().pipe(take(1)).toPromise(),
                        this.afs.collection<any>(`empresas`, ref => ref.where("usuario_uid", "==", user.uid)).valueChanges({ idField: 'uid' }).pipe(take(1)).toPromise()
                    ]).then((arrayData: any[]) => {
                        if (arrayData[0] && arrayData[1].length == 0) {
                            if (!["ADMIN", "EMPRESA"].includes(arrayData[0].perfil)) {
                                this.message.create("error", "O usuário não pode acessar o sistema!");
                                reject("O usuário não pode acessar o sistema!");
                            } else {
                                this.usuario = arrayData[0];
                                this.storage.setStorage("usuario", this.usuario);
                            }
                        } else if (arrayData[1].length > 0) {
                            if (arrayData[1][0].data_bloqueio) {
                                this.message.create("error", "A empresa está bloqueada e não pode acessar o sistema!");
                                reject("A empresa está bloqueada e não pode acessar o sistema!");
                            } else {
                                this.empresa = arrayData[1];
                                this.storage.setStorage("empresa", this.empresa);
                            }
                        } else {
                            this.usuario = null;
                            this.empresa = null;
                        }
                        resolve(user);
                    })
                }
            })
        });
    }

    resetPassword(email: string) {
        return this.angularAuth.auth.sendPasswordResetEmail(email, { url: "https://concurseiro-d6d4e.firebaseapp.com/#/" })
    }

    register(email: string, password: string) {
        return this.angularAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    logout() {
        this.empresa = null;
        this.usuario = null;
        this.storage.eraseStorage();
        return this.angularAuth.auth.signOut();
    }
}
