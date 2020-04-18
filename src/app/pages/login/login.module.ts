import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';



@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
        LoginRoutingModule
    ]
})
export class LoginModule { }
