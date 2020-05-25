import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.countSeconds().then(
      (msj) => console.log('End', msj)
    ).catch(error => console.error('Error', error));
  }

  ngOnInit(): void {
  }

  countSeconds(): Promise<string> {

    const promesa: Promise<string> = new Promise((resolve, reject) => {
      let count = 0;

      const intervalo = setInterval(() => {
        count += 1;
        console.log(count);

        if (count === 3) {
          resolve('OK!');
          clearInterval(intervalo);
        }
      }, 1000);
    });

    return promesa;
  }

}
