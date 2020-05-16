import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class EditorComponent {

    public Editor = ClassicEditor;

    /** @description Descrição do Label */
    @Input() label: string;

    /** @description Control que contem o Reactive Forms do campo */
    @Input() control: FormControl;
}
