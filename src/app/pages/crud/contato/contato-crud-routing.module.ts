import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoCrudComponent } from './contato-crud.component';
import { UniqueResolver } from 'src/app/misc/resolver/unique.resolver';
import { AuthGuard } from 'src/app/misc/guards/auth.guard';


const routes: Routes = [
    {
        path: "", component: ContatoCrudComponent,
        resolve: { crud: UniqueResolver },
        canActivate: [AuthGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContatoCrudRoutingModule { }
