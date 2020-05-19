import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniqueResolver } from 'src/app/misc/resolver/unique.resolver';
import { InicioComponent } from './inicio.component';


const routes: Routes = [
    {
        path: "", component: InicioComponent,
        resolve: { crud: UniqueResolver },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InicioRoutingModule { }
