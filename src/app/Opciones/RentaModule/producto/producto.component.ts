import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Autos } from '../../../services/Productos/Autos';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  @Input() auto!:Autos;
  @Output() eventRenta = new EventEmitter<number>();

  onRentaClick(id:number){
    if(this.auto.disponibilidad){
      this.eventRenta.emit(id);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Este auto no esta disponible',
      })
    }
  }
}
