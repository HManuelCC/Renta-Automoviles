import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-renta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './renta.component.html',
  styleUrl: './renta.component.css'
})
export class RentaComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

    
}
