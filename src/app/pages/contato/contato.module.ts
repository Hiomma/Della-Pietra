import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ComponentsModule } from 'src/app/components/components.module';
import { ContatoRoutingModule } from './contato-routing.module';
import { ContatoComponent } from './contato.component';



@NgModule({
    declarations: [ContatoComponent],
    imports: [
        CommonModule,
        NgZorroAntdModule,
        ContatoRoutingModule,
        ComponentsModule
    ]
})
export class ContatoModule { }
