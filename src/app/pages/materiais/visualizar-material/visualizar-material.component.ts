import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-visualizar-material',
    templateUrl: './visualizar-material.component.html',
    styleUrls: ['./visualizar-material.component.scss']
})
export class VisualizarMaterialComponent implements OnInit {

    @Input() material: any;

    constructor() { }

    ngOnInit(): void {
    }

}
