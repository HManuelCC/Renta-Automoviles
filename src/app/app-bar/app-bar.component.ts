import { Component } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { ProductosService } from '../services/Productos/productos.service';
import { Autos } from '../services/Productos/Autos';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-app-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.css'
})
export class AppBarComponent {
  busqueda=false;
  query:string=''
  autos:Array<Autos>=[]
  constructor(private rutas:Router,private productosService:ProductosService) {

  }

  Home(){
    console.log("Home");
    this.rutas.navigate(['home']);
  }
  Bitacora(){
    this.rutas.navigate(['bitacora']);
  }
  Renta(){
    console.log("Renta");
    this.rutas.navigate(['renta']);
  }

  buscarAuto(){
    if(this.query.length<3){
      this.autos=[]
      this.busqueda=false;
    }else{
      this.productosService.getProductos().subscribe((data)=>{
        this.autos=data.filter((auto)=>auto.marca.toLowerCase().includes(this.query.toLowerCase()) || auto.modelo.toLowerCase().includes(this.query.toLowerCase()))
        if(this.autos.length>=1){
          this.busqueda=true;
        }
      })
    }
    
  }
  mostrarSugerencias(){
    if(this.query.length>2){
      this.busqueda=true;
      return;
    }
    this.busqueda=false;
  }
}
