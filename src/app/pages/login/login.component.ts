import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService, NzCarouselComponent } from 'ng-zorro-antd';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    /** @description Instância Carousel */
    @ViewChild(NzCarouselComponent) carousel: NzCarouselComponent;

    resourceForm: FormGroup
    resetGroup: FormGroup = this.formBuilder.group({ email: [null, [Validators.required, Validators.email]] })

    versao: string;
    strBotaoEntrar: string = "Entrar";
    bLoading: boolean = false;

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private message: NzMessageService,
        private auth: AuthService) { }

    ngOnInit(): void {
        this.resourceForm = this.formBuilder.group({
            userName: [null, [Validators.required]],
            password: [null, [Validators.required]],
        })

        this.versao = environment.versao;
    }

    logar(): void {
        this.bLoading = true;
        this.strBotaoEntrar = "";

        this.auth.login(this.resourceForm.value).then(() => {
            this.router.navigate(["inicio"]);
        }).catch(error => {

            // Volta estado normal
            this.bLoading = false;
            this.strBotaoEntrar = "Entrar";

            console.log(error);
            if (["auth/wrong-password", "auth/user-not-found"].includes(error.code)) {
                this.message.create("error", "Login ou senha incorretos. Tente novamente!");
            }
        })
    }
}
