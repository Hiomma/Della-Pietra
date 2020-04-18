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
            this.router.navigate(["home"]);
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

    resetPassword() {
        this.auth.resetPassword(this.resetGroup.get("email").value).then(() => {
            this.message.create("success", "O E-mail de Recuperação foi enviado com sucesso!");
        }).catch(error => {
            this.message.create("error", "Erro ao enviar o e-mail para a recuperação da senha. Tente novamente!")
            console.error(error);
        })
    }

    next() {
        this.carousel.next();
    }

    back() {
        this.carousel.pre();
    }

}
