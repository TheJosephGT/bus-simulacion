import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-simulacion-bus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simulacion-bus.component.html',
  styleUrl: './simulacion-bus.component.css',
})
export class BusAnimationComponent {
  position: string = 'left';
  stops = [
    {
      name: 'Left',
      peopleArriving: 0,
      peopleWaiting: 0,
      peopleBoarding: 0,
      departureTime: '',
      arrivalTime: '',
      peopleDisembarking: 0,
    },
    {
      name: 'Center',
      peopleArriving: 0,
      peopleWaiting: 0,
      peopleBoarding: 0,
      departureTime: '',
      arrivalTime: '',
      peopleDisembarking: 0,
    },
    {
      name: 'Right',
      peopleArriving: 0,
      peopleWaiting: 0,
      peopleBoarding: 0,
      departureTime: '',
      arrivalTime: '',
      peopleDisembarking: 0,
    },
  ];

  simulationRunning: boolean = false;
  totalPeopleTransported: number = 0;
  peopleLeftOnBus: number = 0;
  totalPeopleTransportedByStop: number[] = [0, 0, 0];
  totalPeopleLeftAtStop: number[] = [0, 0, 0];

  moveBus() {
    this.simulationRunning = true;
    this.animateBus(5); // Realizar 5 ciclos completos
  }

  stopSimulation() {
    this.simulationRunning = false;
    this.calculateStatistics();
  }

  animateBus(cycles: number) {
    let count = 0;
    const totalMoves = cycles * 4; // Cada ciclo consta de 4 movimientos
    const move = () => {
      if (count < totalMoves && this.simulationRunning) {
        const currentTime = new Date().toLocaleTimeString();
        let currentStopIndex = -1; // Inicializar con un valor que no sea válido

        if (this.position === 'left') {
          currentStopIndex = 0;
          this.position = 'center';
        } else if (this.position === 'center') {
          if (count % 4 === 1) {
            this.position = 'right';
            currentStopIndex = 1;
          } else {
            this.position = 'left';
            currentStopIndex = 1;
          }
        } else if (this.position === 'right') {
          currentStopIndex = 2;
          this.position = 'center';
        }

        if (currentStopIndex !== -1) {
          const stop = this.stops[currentStopIndex];
          stop.peopleArriving += Math.floor(Math.random() * 10) + 1;
          stop.peopleWaiting = Math.floor(Math.random() * 20) + 1;
          stop.peopleBoarding = Math.floor(Math.random() * stop.peopleWaiting);
          stop.departureTime = currentTime;
          stop.arrivalTime = currentTime;
          stop.peopleDisembarking = Math.floor(
            Math.random() * stop.peopleBoarding
          );

          // Actualizar estadísticas
          this.totalPeopleTransported += stop.peopleDisembarking;
          this.peopleLeftOnBus += stop.peopleBoarding;
          this.totalPeopleTransportedByStop[currentStopIndex] +=
            stop.peopleDisembarking;
          this.totalPeopleLeftAtStop[currentStopIndex] += stop.peopleBoarding;
        }

        count++;
        setTimeout(move, 1000); // Espera 1 segundo antes de cambiar la posición de nuevo
      }
    };
    move();
  }

  calculateStatistics() {
    // Calcula las estadísticas finales
    console.log(
      'Cantidad de personas transportadas:',
      this.totalPeopleTransported
    );
    console.log(
      'Cantidad de personas que se quedaron en el bus:',
      this.peopleLeftOnBus
    );
    console.log(
      'Total de personas transportadas por parada de origen:',
      this.totalPeopleTransportedByStop
    );
    console.log(
      'Total de personas que se quedaron sin montarse:',
      this.totalPeopleLeftAtStop
    );
  }
}
