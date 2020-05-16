import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Injectable()

export class CrudResolver implements Resolve<any> {

    constructor(private firestore: AngularFirestore,
        private storage: StorageService,
        private auth: AuthService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {

        if (route.params.option == 1) {
            return null;
        } else {
            let table = state.url.split("/")[2] ?? state.url.split("/")[1];

            return new Promise((resolve) => {
                this.firestore.collection<any>(table == "inicio" ? "carousel" : table).snapshotChanges().pipe(map(actions => {
                    return actions.map(action => {
                        const data = action.payload.doc.data() as any;
                        const uid = action.payload.doc.id;
                        return { uid, ...data };
                    })
                })).subscribe(data => {
                    resolve(data);
                })

            })
        }
    }
}