import { Component, OnInit } from '@angular/core';
import { Renta, RentaService } from '../../services/Renta/renta.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-bitacora',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.css'
})
export class BitacoraComponent implements OnInit{
  rentasActuales:Array<Renta>=[];
  rentasPasadas:Array<Renta>=[];
  opciones=['Actuales','Pasadas'];
  opcionSeleccionada='Actuales';
  private datePipe: any;

  constructor(private renta:RentaService) {
    this.datePipe=new DatePipe('en-US');
  }

  ngOnInit(): void {
    this.rentasActuales=this.renta.getRentasActuales();
    this.rentasPasadas=this.renta.getRentasPasadas();
  }

  fechaFinalizacion(fecha:string,hora:string,cant:number){
    let fechaFinalizacion = new Date(this.datePipe.transform(fecha,'yyyy-MM-dd HH:mm:ss'));
    fechaFinalizacion.setHours(parseInt(hora.split(':')[0]),parseInt(hora.split(':')[1]));
    fechaFinalizacion.setDate(fechaFinalizacion.getDate()+(cant));
    return fechaFinalizacion;
  }

  fechaInicio(fecha:string,hora:string){
    let fechaInicio = new Date(this.datePipe.transform(fecha,'yyyy-MM-dd HH:mm:ss'));
    fechaInicio.setHours(parseInt(hora.split(':')[0]),parseInt(hora.split(':')[1]));
    return fechaInicio;
  }
}
