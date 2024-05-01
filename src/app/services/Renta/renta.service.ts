import { Injectable } from '@angular/core';
import { Autos } from '../Productos/Autos';
import { FormGroup } from '@angular/forms';
import { DatosRentas } from './Datos';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RentaService {

  private listRentas:Array<Renta>=localStorage.getItem('rentas')?JSON.parse(localStorage.getItem('rentas')||'[]'):[];
  private datePipe: any;

  constructor() {
    this.datePipe=new DatePipe('en-US');
  }

  setProcutos(auto:Autos,datos:FormGroup){
    let renta={
      auto:auto,
      datos:datos.value
    }
    this.listRentas.push(renta);
    localStorage.setItem('rentas',JSON.stringify(this.listRentas));
  }
  getProductosByIndex(index:number):Renta{
    this.listRentas=localStorage.getItem('rentas')?JSON.parse(localStorage.getItem('rentas')||'[]'):[];
    return this.listRentas[index];
  }

  getRentasPasadas():Array<Renta>{
    this.listRentas=localStorage.getItem('rentas')?JSON.parse(localStorage.getItem('rentas')||'[]'):[];
    if(this.listRentas.length==0){
      return [];
    }else{
      return this.listRentas.filter((renta)=>{
        let fechaExpiracion = new Date(this.datePipe.transform(renta.datos.fecha,'yyyy-MM-dd HH:mm:ss'));
        fechaExpiracion.setHours(Number(renta.datos.hora.split(':')[0]),Number(renta.datos.hora.split(':')[1]));
        fechaExpiracion.setDate(fechaExpiracion.getDate()+renta.datos.duracion);
        return fechaExpiracion.getTime()<new Date().getTime();
      });
    }
  }

  getRentasActuales():Array<Renta>{
    this.listRentas=localStorage.getItem('rentas')?JSON.parse(localStorage.getItem('rentas')||'[]'):[];
    if(this.listRentas.length==0){
      return [];
    }else{
      return this.listRentas.filter((renta)=>{
        let fechaExpiracion = new Date(this.datePipe.transform(renta.datos.fecha,'yyyy-MM-dd HH:mm:ss'));
        fechaExpiracion.setHours(Number(renta.datos.hora.split(':')[0]),Number(renta.datos.hora.split(':')[1]));
        fechaExpiracion.setDate(fechaExpiracion.getDate()+renta.datos.duracion);
        return fechaExpiracion.getTime()>=new Date().getTime();
      });
    }
  }

  mostrarRentas(){
    this.listRentas=localStorage.getItem('rentas')?JSON.parse(localStorage.getItem('rentas')||'[]'):[];
    console.log(this.listRentas);
  }

  clearLS(){
    localStorage.clear();
  }
}

export interface Renta{
  auto:Autos,
  datos:DatosRentas
}
