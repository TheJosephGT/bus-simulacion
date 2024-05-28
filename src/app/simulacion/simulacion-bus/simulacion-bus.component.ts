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
      name: 'Stop 1',
      peopleArriving: 0,
      peopleWaiting: 0,
      peopleBoarding: 0,
      departureTime: '',
      arrivalTime: '',
      peopleDisembarking: 0,
    },
    {
      name: 'Stop 2',
      peopleArriving: 0,
      peopleWaiting: 0,
      peopleBoarding: 0,
      departureTime: '',
      arrivalTime: '',
      peopleDisembarking: 0,
    },
    {
      name: 'Stop 3',
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
  currentPassengersOnBus: number = 0;

  moveBus() {
    this.simulationRunning = true;
    this.animateBus(10);
  }

  stopSimulation() {
    this.simulationRunning = false;
  }

  animateBus(cycles: number) {
    let counter = 0;
    const totalMovements = cycles * 4; // El ciclo se repite 4 veces
    const move = () => {
      if (counter < totalMovements && this.simulationRunning) {
        const currentTime = new Date().toLocaleTimeString();
        let currentStopIndex = -1;

        if (this.position === 'left') {
          currentStopIndex = 0;
          this.position = 'center';
        } else if (this.position === 'center') {
          if (counter % 4 === 1) {
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
          stop.peopleArriving += Math.floor(Math.random() * 20) + 1; //Se calcula automÃ¡ticamente el nÃomero de personas que llegan a la parada
          stop.peopleWaiting = Math.floor(Math.random() * 10) + 1; //Se calcula automÃ¡ticamente el nÃomero de personas que esperan en la parada
          stop.peopleBoarding = Math.floor(Math.random() * stop.peopleWaiting);
          stop.departureTime = currentTime;
          stop.arrivalTime = currentTime;
          stop.peopleDisembarking = Math.floor(
            Math.random() * stop.peopleBoarding
          ); //Personas que suben al bus con numero aleatorio basando en la cantidad de personas que esperan en la parada

          //Actualizamos totales
          this.totalPeopleTransported += stop.peopleDisembarking;
          this.peopleLeftOnBus += stop.peopleBoarding - stop.peopleDisembarking;
          this.totalPeopleTransportedByStop[currentStopIndex] +=
            stop.peopleDisembarking;
          this.totalPeopleLeftAtStop[currentStopIndex] += stop.peopleBoarding;
          this.currentPassengersOnBus +=
            stop.peopleBoarding - stop.peopleDisembarking;
        }

        counter++;
        setTimeout(move, 1000); // Wait 1 second before changing the position again
      }
    };
    move();
  }
}
