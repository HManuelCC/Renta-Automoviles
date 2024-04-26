import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autos } from './Autos';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  autos?:Observable<Array<Autos>>

  constructor(private http:HttpClient) { }

  getProductos():Observable<Autos[]>{

    this.autos=this.http.get<Autos[]>('http://186.96.32.178:90/data');
    
    return this.autos;
  }
}
