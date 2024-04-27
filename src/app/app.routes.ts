import { Routes } from '@angular/router';
import { HomeComponent } from './Opciones/home/home.component';
import { BitacoraComponent } from './Opciones/bitacora/bitacora.component';
import { CatalogoComponent } from './Opciones/catalogo/catalogo.component';
import { RentaComponent } from './Opciones/renta/renta.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path:'renta',component: CatalogoComponent},
    { path: 'bitacora', component: BitacoraComponent},
    { path: 'renta/:id', component: RentaComponent},
];
