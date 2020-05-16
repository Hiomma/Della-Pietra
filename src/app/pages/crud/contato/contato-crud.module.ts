import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatoCrudRoutingModule } from './contato-crud-routing.module';
import { ContatoCrudService } from './contato-crud.service';
import { ComponentsModule } from 'src/app/components/components.module';
import { ContatoCrudComponent } from './contato-crud.component';


@NgModule({
    declarations: [
        ContatoCrudComponent
    ],
    imports: [
        ContatoCrudRoutingModule,
        CommonModule,
        ComponentsModule
    ],
    providers: [
        ContatoCrudService
    ]
})
export class ContatoCrudModule { }
