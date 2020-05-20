import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

  graficos: any = {
    grafico1: {
      labels: ['Con frijoles', 'Con Natilla', 'Con Tocino'],
      data: [24, 30, 46],
      type: 'doughnut',
      legend: 'El pan se come con'
    },
    grafico2: {
      labels: ['Hombres', 'Mujeres'],
      data: [4500, 6000],
      type: 'doughnut',
      legend: 'Entrevistados'
    },
    grafico3: {
      labels: ['Si', 'No'],
      data: [95, 5],
      type: 'doughnut',
      legend: '¿Les dan gases los frijoles?'
    },
    grafico4: {
      labels: ['No', 'Si'],
      data: [85, 15],
      type: 'doughnut',
      legend: '¿Les importa que le den gases?'
    },
  };

  constructor() { }

  ngOnInit(): void {
  }

}
