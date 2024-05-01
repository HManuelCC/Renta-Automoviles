import { Routes } from '@angular/router';
import { HomeComponent } from './Opciones/home/home.component';
import { BitacoraComponent } from './Opciones/BitacoraModule/bitacora/bitacora.component';
import { CatalogoComponent } from './Opciones/RentaModule/catalogo/catalogo.component';
import { RentaComponent } from './Opciones/RentaModule/renta/renta.component';
import { AcercaComponent } from './Opciones/acerca/acerca.component';
import { BitacoraDetalleComponent } from './Opciones/BitacoraModule/bitacora-detalle/bitacora-detalle.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'renta',component: CatalogoComponent},
    { path: 'bitacora', component: BitacoraComponent},
    { path: 'renta/:id', component: RentaComponent},
    { path: 'about', component: AcercaComponent},
    { path: 'detalle/:id', component: BitacoraDetalleComponent},
    { path: 'detalle',redirectTo:'bitacora'}
];
