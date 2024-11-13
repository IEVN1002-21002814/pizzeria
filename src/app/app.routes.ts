import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'partes',
        loadChildren: ()=> import('./partes/partes.routes')
    },
    {
        path: '*',
        redirectTo: ''
    }
];
