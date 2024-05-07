import { Component } from '@angular/core';
import { RouterOutlet,Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from '../services/Productos/productos.service';
import { Autos } from '../services/Productos/Autos';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Renta, RentaService } from '../services/Renta/renta.service';

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
  rentas:Array<Renta>=[]
  rutaActual:string=""
  constructor(private rutas:Router,private productosService:ProductosService,private rentaService:RentaService) {
    this.rutaActual="Home"
  }

  Home(){
    
    this.rutaActual="Home";
    console.log(this.rutaActual);
    this.rutas.navigate(['home']);
  }
  Bitacora(){
    this.rutaActual="bitacora";
    this.rutas.navigate(['bitacora']);
  }
  Renta(){
    console.log("Renta");
    this.rutaActual="renta";
    this.rutas.navigate(['renta']);
  }

  blurSugerencias(){
    setTimeout(()=>{
      this.busqueda=false;
    },200)
  }

  buscarAuto(){
    if(this.query.length<3){
      this.autos=[]
      this.busqueda=false;
    }else{
      this.productosService.getProductos().subscribe((data)=>{
        this.autos=data.filter((auto)=>auto.marca.toLowerCase().includes(this.query.toLowerCase()) || auto.modelo.toLowerCase().includes(this.query.toLowerCase()))
        this.rentas=this.rentaService.getRentaByModeloMarca(this.query);
        if(this.autos.length>=1 || this.rentas.length>=1){
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
  about(){
    this.rutaActual="about";
    this.rutas.navigate(['about']);
  }

  clickSugerenciaCatalogo(auto:Autos){
    if(auto.disponibilidad){
      this.rutas.navigate(['renta',auto.id]);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Este auto no esta disponible',
      })
    }
    this.query=''
  }
  clickSugerenciaRenta(auto:Autos){
    if(auto.disponibilidad){
      this.rutas.navigate(['detalle',auto.id]);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Este auto no esta disponible',
      })
    }
    this.query=''
  }
}
