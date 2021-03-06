import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()

export class CrudResolver implements Resolve<any> {

    constructor(private firestore: AngularFirestore,
        private auth: AuthService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {

        if (route.queryParams.option == 1) {
            return null;
        } else {
            let table = state.url.split("/")[2];

            return new Promise((resolve) => {
                this.auth.verifyUser().then(() => {
                    this.firestore.collection<any>(table).doc(route.queryParams.uid).snapshotChanges().pipe(map(action => {
                        const data = action.payload.data() as any;
                        const uid = action.payload.id;
                        return { uid, ...data };
                    })).subscribe(data => {
                        resolve(data);
                    })
                })
            })
        }
    }
}