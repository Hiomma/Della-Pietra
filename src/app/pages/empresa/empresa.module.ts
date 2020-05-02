import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ComponentsModule } from 'src/app/components/components.module';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa.component';
import { ComumService } from 'src/app/services/comum.service';



@NgModule({
    declarations: [EmpresaComponent],
    imports: [
        CommonModule,
        NgZorroAntdModule,
        EmpresaRoutingModule,
        ComponentsModule
    ],
    providers: [
        ComumService
    ]
})
export class EmpresaModule { }
