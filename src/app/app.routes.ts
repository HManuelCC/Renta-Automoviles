import { Routes } from '@angular/router';
import { HomeComponent } from './Opciones/home/home.component';
import { RentaComponent } from './Opciones/renta/renta.component';
import { BitacoraComponent } from './Opciones/bitacora/bitacora.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path:'renta',component: RentaComponent},
    { path: 'bitacora', component: BitacoraComponent},
];
