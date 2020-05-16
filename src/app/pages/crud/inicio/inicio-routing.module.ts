import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { CrudResolver } from 'src/app/misc/resolver/crud.resolver';
import { AuthGuard } from 'src/app/misc/guards/auth.guard';


const routes: Routes = [
    {
        path: "", component: InicioComponent,
        resolve: { crud: CrudResolver },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InicioRoutingModule { }
