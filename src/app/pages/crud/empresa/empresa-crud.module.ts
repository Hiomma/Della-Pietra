import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { EmpresaCrudRoutingModule } from './empresa-crud-routing.module';
import { EmpresaCrudComponent } from './empresa-crud.component';
import { EmpresaCrudService } from './empresa-crud.service';

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
