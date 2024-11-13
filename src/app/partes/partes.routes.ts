import { Routes } from "@angular/router";

export default[
    {
        path: 'formulario',
        loadComponent: ()=> import('./formulario/formulario.component'),
    },
    {
        path: 'lista-orden',
        loadComponent: ()=> import('./lista-orden/lista-orden.component'),
    },
    {
        path: 'filtrado',
        loadComponent: ()=> import('./filtrado/filtrado.component'),
    }
] as Routes