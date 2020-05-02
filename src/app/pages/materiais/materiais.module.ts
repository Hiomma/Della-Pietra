import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ComponentsModule } from 'src/app/components/components.module';
import { MateriaisRoutingModule } from './materiais-routing.module';
import { MateriaisComponent } from './materiais.component';
import { ComumService } from 'src/app/services/comum.service';
import { VisualizarMaterialComponent } from './visualizar-material/visualizar-material.component';



@NgModule({
    declarations: [
        MateriaisComponent,
        VisualizarMaterialComponent,
    ],
    imports: [
        CommonModule,
        NgZorroAntdModule,
        MateriaisRoutingModule,
        ComponentsModule
    ],
    providers: [
        ComumService
    ],
    entryComponents: [
        VisualizarMaterialComponent,
    ]
})
export class MateriaisModule { }
