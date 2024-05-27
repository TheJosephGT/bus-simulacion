import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BusAnimationComponent } from './simulacion/simulacion-bus/simulacion-bus.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BusAnimationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'simulacionBus';
}
