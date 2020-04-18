import { Component, Input, OnDestroy, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AbstractControl, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { CustomValidators } from 'src/app/misc/validators/validators';

@Component({
    selector: 'autocompleteField',
    templateUrl: './autocomplete-field.component.html',
    styleUrls: ['./autocomplete-field.component.scss']
})
export class AutocompleteFieldComponent implements OnInit, OnDestroy {

    /** @description Nome do Campo */
    @Input() field: string;

    /** @description Descrição do Label */
    @Input() label: string;

    /** @description Control que contem o Reactive Forms do campo */
    @Input() control: FormControl;

    /** @description Nome da tabela para buscar os options */
    @Input() table: string;

    /** @description ID do campo */
    @Input() id: string;

    /** @description Nome do campo para o filtro */
    @Input() filterName: string;

    /** @description Nome do campo para mostrar os options */
    @Input() exhibitionName: string = "nome";

    /** @description Retorna o objeto inteiro? */
    @Input() returnObject: boolean = false;

    /** @description Variavel auxiliar, contem a string com o valor do erro */
    error: string = "";

    /**@description Variavel que identifica se o campo é required ou não */
    required: boolean = false;

    /**@description Lista de opções para mostrar na tela */
    listOptions: Array<any> = []

    @ViewChild("input", { static: true }) private input: ElementRef;

    private unSub = new Subject();

    get erro() {
        if (this.control.invalid && this.control.enabled) {
            for (let nomeErro in this.control.errors) {
                this.error = CustomValidators.getErrorMsg(this.label, nomeErro, this.control.errors[nomeErro]);
                return this.error;
            }
        }
    }

    constructor(private firestore: AngularFirestore,
        private renderer: Renderer2,
    ) { }

    ngOnInit(): void {
        if (!this.control) {
            this.control = new FormControl({ value: null, disabled: true })
        }

        // Essa linha serve para setar automaticamente para mim um valor antes de iniciar a tela
        if (this.control.value) {
            let valor = (this.control.value[this.exhibitionName] ? this.control.value[this.exhibitionName] : this.control.value);
            setTimeout(() => { this.renderer.setProperty(this.input.nativeElement, "value", valor) });
        }

        // Verifica se é requerido
        if (this.control.validator) {
            const validator = this.control.validator({} as AbstractControl);
            if (validator && validator.required) {
                this.required = true;
            }
        }

        // Value Changes para fazer o filter de cada letra escrita pelo usuário
        this.control.valueChanges.pipe(takeUntil(this.unSub), debounceTime(500)).subscribe(value => {
            this.firestore.collection<any>(this.table, ref => ref.orderBy(this.filterName).startAt(value).endAt(value + '\uf8ff').limit(50)).snapshotChanges().pipe(map(actions => {
                return actions.map(action => {
                    const data = action.payload.doc.data() as any;
                    const uid = action.payload.doc.id;
                    return { uid, ...data };
                })
            })).subscribe((data: any) => {
                this.listOptions = data;
            })
        })
    }

    ngOnDestroy() {
        this.unSub.next();
        this.unSub.complete();
    }

}
