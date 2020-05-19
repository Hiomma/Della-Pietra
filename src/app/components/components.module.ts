import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TextMaskModule } from 'angular2-text-mask';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxCurrencyModule } from "ngx-currency";
import { InheritanceComponent } from '../misc/inheritance/inheritance.component';
import { AddImageComponent } from './add-image/add-image.component';
import { AddListComponent } from './add-list/add-list.component';
import { AutocompleteFieldComponent } from './autocomplete-field/autocomplete-field.component';
import { EditorComponent } from './editor/editor.component';
import { FooterComponent } from './footer/footer.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { JanelaSiteComponent } from './janela-site/janela-site.component';
import { JanelaComponent } from './janela/janela.component';
import { SelectFieldComponent } from './select-field/select-field.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { AddImagesComponent } from './add-images/add-images.component';

@NgModule({
    declarations: [
        InheritanceComponent,
        JanelaComponent,
        InputFieldComponent,
        TextAreaComponent,
        AutocompleteFieldComponent,
        SelectFieldComponent,
        AddImageComponent,
        AddImagesComponent,
        AddListComponent,
        FooterComponent,
        JanelaSiteComponent,
        EditorComponent
    ],
    imports: [
        CommonModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
        FormsModule,
        TextMaskModule,
        RouterModule,
        CKEditorModule,
        NgxCurrencyModule
    ],
    entryComponents: [
        InheritanceComponent,
        JanelaComponent,
        InputFieldComponent,
        TextAreaComponent,
        AutocompleteFieldComponent,
        SelectFieldComponent,
        AddImageComponent,
        AddImagesComponent,
        AddListComponent,
        FooterComponent,
        JanelaSiteComponent,
    ],
    exports: [
        NgZorroAntdModule,
        ReactiveFormsModule,
        InheritanceComponent,
        JanelaComponent,
        InputFieldComponent,
        TextAreaComponent,
        AutocompleteFieldComponent,
        SelectFieldComponent,
        AddImageComponent,
        AddImagesComponent,
        AddListComponent,
        EditorComponent,
        FooterComponent,
        JanelaSiteComponent,
        FormsModule
    ],
})
export class ComponentsModule { }
