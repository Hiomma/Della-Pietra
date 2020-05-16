import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
    {
        path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
    },
    {
        path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'crud/empresa', loadChildren: () => import('./pages/crud/empresa/empresa-crud.module').then(m => m.EmpresaCrudModule)
    },
    // {
    //     path: 'crud/empresa', loadChildren: () => import('./pages/crud/empresa/empresa-crud.module').then(m => m.EmpresaCrudModule)
    // },
    // {
    //     path: 'crud/empresa', loadChildren: () => import('./pages/crud/empresa/empresa-crud.module').then(m => m.EmpresaCrudModule)
    // },
    {
        path: 'inicio', loadChildren: () => import('./pages/crud/inicio/inicio.module').then(m => m.InicioModule)
    },
    {
        path: 'empresa', loadChildren: () => import('./pages/empresa/empresa.module').then(m => m.EmpresaModule)
    },
    {
        path: 'materiais', loadChildren: () => import('./pages/materiais/materiais.module').then(m => m.MateriaisModule)
    },
    {
        path: 'contato', loadChildren: () => import('./pages/contato/contato.module').then(m => m.ContatoModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
