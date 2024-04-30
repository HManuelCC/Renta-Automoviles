import { Component, OnInit } from '@angular/core';
import { Renta, RentaService } from '../../services/Renta/renta.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bitacora',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.css'
})
export class BitacoraComponent implements OnInit{
  rentasActuales:Array<Renta>=[];
  rentasPasadas:Array<Renta>=[];
  opciones=['Actuales','Pasadas'];
  opcionSeleccionada='Actuales';

  constructor(private renta:RentaService) {
  }

  ngOnInit(): void {
    this.rentasActuales=this.renta.getRentasActuales();
    this.rentasPasadas=this.renta.getRentasPasadas();
  }
}
