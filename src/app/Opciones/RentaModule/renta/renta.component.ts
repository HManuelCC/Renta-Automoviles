import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormGroup, FormsModule,FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Autos } from '../../../services/Productos/Autos';
import { ProductosService } from '../../../services/Productos/productos.service';
import Swal from 'sweetalert2';
import { RentaService } from '../../../services/Renta/renta.service';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-renta',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,MatDatepickerModule
    ,MatFormField,MatLabel,MatFormFieldModule,MatInputModule,MatIconModule,MatButtonModule],
  templateUrl: './renta.component.html',
  styleUrl: './renta.component.css'
})
export class RentaComponent implements OnInit{

  auto?:Autos;
  datePipe: any;
  @ViewChild('picker') picker!: MatDatepicker<Date>;
  datosReservacion:FormGroup = new FormGroup({
    nombre:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    telefono:new FormControl('',[Validators.required,Validators.pattern('^[0-9]*$')]),
    fecha:new FormControl('',Validators.required),
    hora:new FormControl('',Validators.required),
    duracion:new FormControl('1',Validators.required),
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      this.productos.getProductoById(params['id']).then((data)=>{
        this.auto=data;
      })
    });
    
  }

  constructor(private route: ActivatedRoute,private productos:ProductosService,private navigator:Router,private renta:RentaService) { 
    this.datePipe=new DatePipe('en-US');
  }

  validarFecha(fecha:string,hora:string){
    if(fecha=='' || hora==''){
      return true;
    }
    let fechaActual = new Date(this.datePipe.transform(Date.now(),'yyyy-MM-dd HH:mm:ss'));
    console.log(fechaActual);
    let fechaSeleccionada =new Date(fecha);
    fechaSeleccionada=new Date(this.datePipe.transform(fecha,'yyyy-MM-dd HH:mm:ss'))
    fechaSeleccionada.setHours(Number(hora.split(':')[0]));
    fechaSeleccionada.setMinutes(Number(hora.split(':')[1]));
    
    if (fechaSeleccionada.getTime()>fechaActual.getTime()) {
      return false;
    }else{
      return true;
    }
  }

  submitDatos(){
   if(this.validarFecha(this.datosReservacion.value.fecha,this.datosReservacion.value.hora)){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No puedes rentar un auto en el pasado',
    })
    this.datosReservacion.controls['fecha'].setValue('');
    this.datosReservacion.controls['hora'].setValue('');
    return;
   }
   if(this.fechaOcupada(this.datosReservacion.value.fecha,this.datosReservacion.value.hora,this.auto!.id)){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El auto ya esta rentado en esa fecha',
    })
    this.datosReservacion.controls['fecha'].setValue('');
    this.datosReservacion.controls['hora'].setValue('');
    return;
   }
    Swal.fire({
      title: '¿Estas seguro?',
      text: "¿Deseas rentar este auto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await Swal.fire(
          'Reservado',
          'Tu reservacion ha sido realizada',
          'success'
        )
        this.datosReservacion.controls['duracion'].setValue(Number(this.datosReservacion.value.duracion));
        this.renta.setProcutos(this.auto!,this.datosReservacion);
        this.navigator.navigate(['renta']);
      }else{
        await Swal.fire(
          'Cancelado',
          'Tu reservacion ha sido cancelada',
          'error'
        )
        this.datosReservacion.reset();
        this.datosReservacion.controls['duracion'].setValue(1);
        //this.navigator.navigate(['renta']);
      }
    })
  }

  cambiarSemanas(aumentar:boolean){
    if(aumentar){
      if(this.datosReservacion.value.duracion<10){
        this.datosReservacion.controls['duracion'].setValue(Number(this.datosReservacion.value.duracion)+1);
      }
    }else{
      if(this.datosReservacion.value.duracion>1){
        this.datosReservacion.controls['duracion'].setValue(Number(this.datosReservacion.value.duracion)-1);
      }
    }
  }

  fechaOcupada(fecha:string,hora:string,id:number):boolean{
    let fechaSolicitada = new Date(this.datePipe.transform(fecha,'yyyy-MM-dd HH:mm:ss'));
    fechaSolicitada.setHours(Number(hora.split(':')[0]),Number(hora.split(':')[1]));
    let rentasActuales = this.renta.getRentasById(id);
    if(rentasActuales.length==0){
      return false;
    }
    rentasActuales=rentasActuales.filter((renta)=>{
      let fechafinalizacion=new Date(this.datePipe.transform(renta.datos.fecha,'yyyy-MM-dd HH:mm:ss'));
      fechafinalizacion.setHours(Number(renta.datos.hora.split(':')[0]),Number(renta.datos.hora.split(':')[1]));
      fechafinalizacion.setDate(fechafinalizacion.getDate()+renta.datos.duracion);
      console.log("Fehca Finalizacion: "+fechafinalizacion+" fecha solicitada: "+fechaSolicitada);
      return fechaSolicitada.getTime()<fechafinalizacion.getTime();
    })
    console.log(rentasActuales);
    return rentasActuales.length>0;
  }
    
}
