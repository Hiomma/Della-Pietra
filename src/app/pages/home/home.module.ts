import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ComponentsModule } from 'src/app/components/components.module';
import { ComumService } from 'src/app/services/comum.service';
import { HomeComponent } from '../home/home.component';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        NgZorroAntdModule,
        HomeRoutingModule,
        ComponentsModule
    ],
    providers: [
        ComumService
    ]
})
export class HomeModule { }
