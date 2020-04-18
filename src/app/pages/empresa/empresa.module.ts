import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ComponentsModule } from 'src/app/components/components.module';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa.component';



@NgModule({
    declarations: [EmpresaComponent],
    imports: [
        CommonModule,
        NgZorroAntdModule,
        EmpresaRoutingModule,
        ComponentsModule
    ]
})
export class EmpresaModule { }
