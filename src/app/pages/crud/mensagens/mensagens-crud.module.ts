import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MensagensCrudRoutingModule } from './mensagens-crud-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { MensagensCrudComponent } from './mensagens-crud.component';
import { MensagensCrudService } from './mensagens-crud.service';
import { MensagensListaComponent } from './mensagens-lista.component';


@NgModule({
    declarations: [
        MensagensCrudComponent,
        MensagensListaComponent
    ],
    imports: [
        MensagensCrudRoutingModule,
        CommonModule,
        ComponentsModule
    ],
    providers: [
        MensagensCrudService
    ]
})
export class MensagensCrudModule { }
