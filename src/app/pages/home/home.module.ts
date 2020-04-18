import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        NgZorroAntdModule,
        HomeRoutingModule,
        ComponentsModule
    ]
})
export class HomeModule { }
