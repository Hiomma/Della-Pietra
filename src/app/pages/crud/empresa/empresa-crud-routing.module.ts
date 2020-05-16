import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/misc/guards/auth.guard';
import { CrudResolver } from 'src/app/misc/resolver/crud.resolver';
import { EmpresaCrudComponent } from './empresa-crud.component';


const routes: Routes = [
    {
        path: "", component: EmpresaCrudComponent,
        resolve: { crud: CrudResolver },
        canActivate: [AuthGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmpresaCrudRoutingModule { }
