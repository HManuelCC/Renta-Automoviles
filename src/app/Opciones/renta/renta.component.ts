import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/Productos/productos.service';
import { Autos } from '../../services/Productos/Autos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-renta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './renta.component.html',
  styleUrl: './renta.component.css'
})
export class RentaComponent implements OnInit{

    private prodcutos?:Array<Autos>
  
    constructor(private productos:ProductosService) { }
  
    ngOnInit(): void {
      this.productos.getProductos().subscribe((data)=>{
        this.prodcutos=data;
        console.log(this.prodcutos)
      });
    }

    getProductos():Array<Autos>{
      if (this.productos!=null){
        return this.prodcutos!;
      }else{
        return [];
      }
    }
}
