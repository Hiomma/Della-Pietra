import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl } from '@angular/forms';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    selector: 'add-images',
    templateUrl: './add-images.component.html',
    styleUrls: ['./add-images.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AddImagesComponent implements OnInit {

    /** @description Lista de Arquivos */
    fileList = [];

    /** @description Options para aparecer um preview */
    showUploadList = {
        showPreviewIcon: true,
        showRemoveIcon: true,
        hidePreviewIconInNonImage: true
    };

    /** @description URL do Preview */
    previewImage: string | undefined = '';

    /** @description Caso o preview esteja visible */
    previewVisible = false;

    /** @description Control para a imagem */
    @Input() control: FormControl;

    /** @description Caminho da imagem */
    @Input() path: string;

    /** @description Título do Componente */
    @Input() title: string = "Imagem";

    /** @description Evento para emitir quando foi enviado o arquivo */
    @Output() getFile = new EventEmitter();


    constructor(
        private message: NzMessageService,
        private firestore: AngularFirestore,
        private fireStorage: AngularFireStorage) { }

    ngOnInit(): void {
        for (let aux of this.control.value) {
            const ref = this.fireStorage.ref(aux);
            ref.getDownloadURL().subscribe((data) => {
                this.fileList.push({
                    uid: -1,
                    name: aux.replace(this.path + "/", ""),
                    status: "done",
                    url: data
                })

                this.fileList = this.fileList.concat([]);
            })
        }
    }

    /** @description Isso é um macete, porque é obrigatório fazer um upload de imagem e isso faz enganar o componente do Ant */
    dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    }

    /** @description Mostra o preview da imagem */
    handlePreview = (file: UploadFile) => {
        this.previewImage = file.url || file.thumbUrl;
        this.previewVisible = true;
    };

    /**
     * @description Upload do arquivo enviado
     * @param {*} event
     */
    onChange(imagemSelecionada: any) {
        if (imagemSelecionada.type == "success") {
            let file = imagemSelecionada.file.originFileObj;

            var reader = new FileReader();
            reader.readAsDataURL(imagemSelecionada.file.originFileObj);

            let filePath = this.path + "/";

            let list: string[] = this.control.value ?? [];

            list.push(filePath + file.name);

            this.control.setValue(list);

            const ref = this.fireStorage.ref(list[list.length - 1]);
            ref.put(file);

            this.salvarImagem();
        } else if (imagemSelecionada.type == "removed") {
            let list: string[] = this.control.value;
            list.splice(list.findIndex(element => element == imagemSelecionada.file.name), 1)

            this.control.setValue(list);
            this.fireStorage.ref(this.path + "/" + imagemSelecionada.file.name).delete();

            this.salvarImagem();
        }
    }

    salvarImagem() {
        this.firestore.collection<any>(this.path).doc(this.control.root.get("uid").value).update(this.control.root.value).catch(err => {
            this.message.create("error", "Houve um erro ao atualizar os dados. Tente novamente!");
            console.error(err);
        })
    }
}
