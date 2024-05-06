import { Component } from '@angular/core';
import { DomseguroPipe } from '../../domseguro.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DomseguroPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
video: string = "h9dTYG1y21k?si=GRq3sprqebSDFsK3"
}
