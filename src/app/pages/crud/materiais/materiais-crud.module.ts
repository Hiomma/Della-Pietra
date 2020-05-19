import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { MateriaisCrudRoutingModule } from './materiais-crud-routing.module';
import { MateriaisCrudComponent } from './materiais-crud.component';
import { MateriaisListaComponent } from './materiais-lista.component';
import { MateriaisCrudService } from './materiais-crud.service';



@NgModule({
    declarations: [
        MateriaisCrudComponent,
        MateriaisListaComponent,
    ],
    imports: [
        MateriaisCrudRoutingModule,
        CommonModule,
        ComponentsModule
    ],
    providers: [
        MateriaisCrudService
    ]
})
export class MateriaisCrudModule { }
