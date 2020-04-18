import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private firestore: AngularFirestore,
        private storage: StorageService,
    ) {
    }

    getAll(table: string) {
        return new Promise((resolve, reject) => {
            this.firestore.collection<any>(table).snapshotChanges().pipe(map(actions => {
                return actions.map(action => {
                    const data = action.payload.doc.data() as any;
                    const uid = action.payload.doc.id;
                    return { uid, ...data };
                })
            })).subscribe((data: any) => {
                resolve(data);
            }, error => {
                reject(error)
            })
        })
    }
}

