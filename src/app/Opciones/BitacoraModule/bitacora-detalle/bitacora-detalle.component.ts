import { Component, OnInit } from '@angular/core';
import { Renta, RentaService } from '../../../services/Renta/renta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-bitacora-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bitacora-detalle.component.html',
  styleUrl: './bitacora-detalle.component.css'
})
export class BitacoraDetalleComponent implements OnInit{
  rentas:Array<Renta>=[];
  datePipe:any
  constructor(private route:ActivatedRoute,private rentasService:RentaService,private navigator:Router){
    this.datePipe=new DatePipe('en-US');
  }
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.rentas=this.rentasService.getRentasById(params['id']);
      if(this.rentas.length==0){
        this.navigator.navigate(['bitacora']);
      }
    });
  }
  fechaFinalizacion(fecha:string,hora:string,duracion:number){
    let fechaFinal = new Date(this.datePipe.transform(Date.now(),'yyyy-MM-dd HH:mm:ss'));
    fechaFinal.setHours(Number(hora.split(':')[0])+duracion);
    fechaFinal.setMinutes(Number(hora.split(':')[1]));
    return fechaFinal;
  }
  
  colorBorde(fecha:string){
    let rentasPasadas = this.rentasService.getRentasPasadas().filter((renta)=>{
      return renta.datos.fecha==fecha;
    });
    if(rentasPasadas.length>0){
      return '#CD2A19"';
    }else{
      return '#19CDAA';
    }
  }
}
