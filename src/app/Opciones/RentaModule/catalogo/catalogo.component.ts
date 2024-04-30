import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../services/Productos/productos.service';
import { Autos } from '../../../services/Productos/Autos';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductoComponent } from '../producto/producto.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule,ProductoComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit{
  private prodcutos?:Array<Autos>
  
    constructor(private productos:ProductosService,private navigator:Router) { }
  
    ngOnInit(): void {
      this.productos.getProductos().subscribe((data)=>{
        this.prodcutos=data;
      });
    }

    getProductos():Array<Autos>{
      if (this.productos!=null){
        return this.prodcutos!;
      }else{
        return [];
      }
    }

    mostrarRenta(id:number){
      this.navigator.navigate(['renta',id]);
    }
}
