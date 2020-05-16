import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaCrudRoutingModule } from './materiais-crud-routing.module';
import { EmpresaCrudService } from './materiais-crud.service';
import { ComponentsModule } from 'src/app/components/components.module';
import { EmpresaCrudComponent } from './materiais-crud.component';


@NgModule({
    declarations: [
        EmpresaCrudComponent
    ],
    imports: [
        EmpresaCrudRoutingModule,
        CommonModule,
        ComponentsModule
    ],
    providers: [
        EmpresaCrudService
    ]
})
export class EmpresaCrudModule { }
