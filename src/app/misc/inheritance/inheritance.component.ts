import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { debounceTime, map, take, takeUntil } from 'rxjs/operators';
import { ComumService } from 'src/app/services/comum.service';
import { MenuService } from 'src/app/services/menu.service';
import { StorageService } from 'src/app/services/storage.service';
import { IActions, IMenu } from '../interfaces/menu.interface';

@Component({
    selector: 'inheritance',
    templateUrl: './inheritance.component.html',
    styleUrls: ['./inheritance.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InheritanceComponent implements OnInit {

    /** @description Lista de Colunas da Tabela */
    @Input() listColumns: Array<any> = [];

    /** @description Tabela do crud */
    @Input() table: string;

    loadingTable: boolean = false;

    /** @description Lista que auxilia a exibição da tabela sem alterar o valor, é importante essa variavel para não dar tantos reloads na tela e pesar no uso de memória do Javascript */
    listExhibitionTable: any[][] = [];

    /** @description Lista de Dados */
    listData: Array<any> = [];

    /** @description Control para a Pesquisa */
    searchControl = new FormControl(null, Validators.maxLength(100));

    /** @description Unsub para destruir os subscribes */
    private unSub = new Subject();

    /** @description Página selecionada */
    menu: IMenu;

    /** @description Açoes do Botões */
    actions: IActions[];

    constructor(private router: Router,
        private firestore: AngularFirestore,
        private message: NzMessageService,
        private comum: ComumService,
        private storage: StorageService,
        private menuService: MenuService) { }

    ngOnInit(): void {
        this.menu = this.menuService.listMenu.find(element => window.location.hash.includes(element.routerLink[0]));
        this.actions = this.menu?.actions.filter(element => element.name != "Adicionar");

        this.filterData();

        /** @description Filtro por cada letra digitada do usuario */
        this.searchControl.valueChanges.pipe(takeUntil(this.unSub), debounceTime(500)).subscribe(value => {
            this.filterData(value);
        });

        //Subscribe que fica ouvindo quando a tela for fechada
        setTimeout(() => {
            this.comum.closedPage$.pipe(takeUntil(this.unSub)).subscribe((data: { action: string }) => {
                this.filterData("", data?.action);
            })
        })
    }

    /** @description Requisição para filtrar os dados */
    filterData(string = "", action?: string) {
        this.loadingTable = true;
        if (this.storage.getStorage("empresa")) {
            this.firestore.collection<any>(this.table, ref => ref.orderBy(["conteudos", "ofertas"].includes(this.table) ? "descricao" : "nome").startAt(string).endAt(string + '\uf8ff')
                .limit(50).where(this.table == "ofertas" ? "empresa.uid" : "empresa_uid", "==", this.storage.getStorage("empresa")[0].uid)).snapshotChanges().pipe(take(1), map(actions => {
                    return actions.map(action => {
                        const data = action.payload.doc.data();
                        const uid = action.payload.doc.id;
                        return { uid, ...data };
                    });
                })).subscribe(data => {
                    this.setListData(data, action);
                    this.loadingTable = false;
                })
        } else {
            this.firestore.collection<any>(this.table, ref => ref.orderBy(["conteudos", "ofertas"].includes(this.table) ? "descricao" : this.table == "usuarios" ? "displayName" : "nome").startAt(string).endAt(string + '\uf8ff').limit(50))
                .snapshotChanges().pipe(take(1), map(actions => {
                    return actions.map(action => {
                        const data = action.payload.doc.data();
                        const uid = action.payload.doc.id;
                        return { uid, ...data };
                    });
                })).subscribe(data => {
                    this.setListData(data, action);
                    this.loadingTable = false;
                })
        }
    }

    /** @description Faz a atualização da tabela */
    private setListData(data: Array<any>, action?: string) {
        let aux = ["conteudos", "ofertas"].includes(this.table) ? "descricao" : this.table == "usuarios" ? "displayName" : "nome";

        data.sort((a, b) => {
            if (a[aux].toLowerCase() < b[aux].toLowerCase()) {
                return -1;
            }
            if (a[aux].toLowerCase() > b[aux].toLowerCase()) {
                return 1;
            }
            return 0;
        });

        if (action == "update") {
            if (this.listData.findIndex(element => element.uid == data[0].uid) >= 0) {
                this.listData[this.listData.findIndex(element => element.uid == data[0].uid)] = data[0];
            }
        } else {
            this.listData = data;
        }

        this.listData.forEach((element, i: number) => {
            this.listExhibitionTable[i] = [];
            this.listColumns.forEach((column, j: number) => {
                this.listExhibitionTable[i][j] = column.function ? column.function(element) : element[column.value];
            })
        });

        this.listData = this.listData.concat([]);

        this.listData.forEach(element => element.data_bloqueio ? element.status = false : element.status = true)
    }

    /** @description Navega para ação selecionada */
    executeAction(action: IActions, row?: any) {
        if (row) {
            action.routerLink[1].outlets.cadastro[2] = row.uid;
        }

        if (row)
            row.visible = false;

        this.router.navigate(action.routerLink)
    }

    /** @description Seta a Data de bloqueio caso desative o campo */
    setDataBloqueio(lineSelected: any) {
        if (!lineSelected.status) {
            lineSelected.data_bloqueio = new Date();
        } else {
            lineSelected.data_bloqueio = null;
        }

        this.firestore.collection<any>(this.table).doc(lineSelected.uid).update(lineSelected).then(() => {
            this.message.create("success", "Status modificado com sucesso!");
        }).catch(err => {
            this.message.create("error", "Houve um erro ao atualizar os dados. Tente novamente!");
            console.error(err);
        })
    }

    ngOnDestroy() {
        this.unSub.next();
        this.unSub.complete();
    }
}
