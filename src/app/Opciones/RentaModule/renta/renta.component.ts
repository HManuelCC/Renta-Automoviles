import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Autos } from '../../../services/Productos/Autos';
import { ProductosService } from '../../../services/Productos/productos.service';

@Component({
  selector: 'app-renta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './renta.component.html',
  styleUrl: './renta.component.css'
})
export class RentaComponent implements OnInit{

  auto?:Autos

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      this.productos.getProductoById(params['id']).then((data)=>{
        this.auto=data;
        console.log(this.auto)
      })
    });
  }

  constructor(private route: ActivatedRoute,private productos:ProductosService) { 
    
  }
    
}
