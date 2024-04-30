import { Injectable } from '@angular/core';
import { Autos } from '../Productos/Autos';
import { FormGroup } from '@angular/forms';
import { DatosRentas } from './DatosRentas';

@Injectable({
  providedIn: 'root'
})
export class RentaService {

  private listRentas:Array<Renta>=localStorage.getItem('rentas')?JSON.parse(localStorage.getItem('rentas')||'[]'):[];

  constructor() { }

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

  clearLS(){
    localStorage.clear();
  }
}

export interface Renta{
  auto:Autos,
  datos:DatosRentas
}
