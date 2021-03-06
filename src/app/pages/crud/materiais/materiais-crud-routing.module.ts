import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/misc/guards/auth.guard';
import { CrudResolver } from 'src/app/misc/resolver/crud.resolver';
import { MateriaisCrudComponent } from './materiais-crud.component';
import { MateriaisListaComponent } from './materiais-lista.component';


const routes: Routes = [
    {
        path: "", component: MateriaisListaComponent
    }, {
        path: 'materiais', component: MateriaisCrudComponent,
        resolve: { crud: CrudResolver },
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MateriaisCrudRoutingModule { }
