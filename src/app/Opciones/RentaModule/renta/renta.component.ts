import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormGroup, FormsModule,FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Autos } from '../../../services/Productos/Autos';
import { ProductosService } from '../../../services/Productos/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-renta',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './renta.component.html',
  styleUrl: './renta.component.css'
})
export class RentaComponent implements OnInit{

  auto?:Autos;
  datePipe: any;
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
        console.log(this.auto);
      })
    });
  }

  constructor(private route: ActivatedRoute,private productos:ProductosService,private navigator:Router) { 
    this.datePipe=new DatePipe('en-US');
  }

  validarFecha(fecha:string,hora:string){
    if(fecha=='' || hora==''){
      return false;
    }
    let fechaActual = new Date();
    let fechaSeleccionada =new Date(fecha);
    fechaActual.setSeconds(0);
    fechaSeleccionada.setHours(parseInt(hora.split(':')[0]),parseInt(hora.split(':')[1]));
    if (fechaSeleccionada.getTime()>=fechaActual.getTime()) {
      return true;
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha seleccionada no es valida',
      })
      this.datosReservacion.controls['fecha'].setValue('');
      this.datosReservacion.controls['hora'].setValue('');
      return false;
    }
  }

  submitDatos(){
   if(!this.validarFecha(this.datosReservacion.value.fecha,this.datosReservacion.value.hora)){
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
        this.navigator.navigate(['renta']);
      }else{
        await Swal.fire(
          'Cancelado',
          'Tu reservacion ha sido cancelada',
          'error'
        )
        this.datosReservacion.reset();
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
    
}
