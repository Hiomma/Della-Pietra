import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/misc/guards/auth.guard';
import { CrudResolver } from 'src/app/misc/resolver/crud.resolver';
import { MensagensCrudComponent } from './mensagens-crud.component';
import { MensagensListaComponent } from './mensagens-lista.component';


const routes: Routes = [
    {
        path: "", component: MensagensListaComponent
    }, {
        path: 'mensagens', component: MensagensCrudComponent,
        resolve: { crud: CrudResolver },
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MensagensCrudRoutingModule { }
