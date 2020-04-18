import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl } from '@angular/forms';
import { UploadFile } from 'ng-zorro-antd';

@Component({
    selector: 'add-image',
    templateUrl: './add-image.component.html',
    styleUrls: ['./add-image.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AddImageComponent implements OnInit {

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
        private storage: AngularFireStorage) { }

    ngOnInit(): void {
        if (this.control.value) {
            const ref = this.storage.ref(this.control.value);
            ref.getDownloadURL().subscribe((data) => {
                this.fileList = [{
                    uid: -1,
                    name: this.control.value.replace(this.path + "/", ""),
                    status: "done",
                    url: data
                }]
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
            this.control.setValue(filePath + btoa(new Date().toLocaleString()) + file.name);

            this.getFile.emit(file)
        } else if (imagemSelecionada.type == "removed") {
            if (this.control.value) {
                this.storage.storage.ref(this.control.value).delete();
                this.control.setValue(null);
            }
        }
    }

}
