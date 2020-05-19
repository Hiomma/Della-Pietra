import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgZorroAntdModule, NZ_I18N, pt_BR } from 'ng-zorro-antd';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudResolver } from './misc/resolver/crud.resolver';
import { UniqueResolver } from './misc/resolver/unique.resolver';
import { AuthService } from './services/auth.service';
import { ComumService } from './services/comum.service';
registerLocaleData(ptBr, 'pt-BR')

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        BrowserModule,
        NgZorroAntdModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFirestoreModule,
    ],
    providers: [
        { provide: NZ_I18N, useValue: pt_BR },
        AuthService,
        CrudResolver,
        UniqueResolver,
        ComumService
    ],
    bootstrap: [AppComponent]

})

export class AppModule {

}



