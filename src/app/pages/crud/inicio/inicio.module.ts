import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InicioComponent } from '../inicio/inicio.component';
import { InicioRoutingModule } from './inicio-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { HomeCrudService } from './home-crud.service';



@NgModule({
    declarations: [InicioComponent],
    imports: [
        CommonModule,
        InicioRoutingModule,
        ComponentsModule,
    ],
    providers: [
        HomeCrudService,
    ]
})
export class InicioModule { }

