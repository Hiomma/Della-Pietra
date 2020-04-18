import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ComponentsModule } from 'src/app/components/components.module';
import { MateriaisRoutingModule } from './materiais-routing.module';
import { MateriaisComponent } from './materiais.component';



@NgModule({
    declarations: [MateriaisComponent],
    imports: [
        CommonModule,
        NgZorroAntdModule,
        MateriaisRoutingModule,
        ComponentsModule
    ]
})
export class MateriaisModule { }
