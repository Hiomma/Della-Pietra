import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/misc/guards/auth.guard';
import { CrudResolver } from 'src/app/misc/resolver/crud.resolver';
import { ContatoCrudComponent } from './contato-crud.component';


const routes: Routes = [
    {
        path: "", component: ContatoCrudComponent
    }, {
        path: 'empresa', component: ContatoCrudComponent,
        outlet: 'cadastro',
        resolve: { crud: CrudResolver },
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContatoCrudRoutingModule { }
