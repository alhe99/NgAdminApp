import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.intervalFn().subscribe(
      data => console.log('Data: ', data),
      error => console.error('Error: ', error),
      () => console.log('Termino!')
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  intervalFn(): Observable<any> {
    const obs: Observable<any> = new Observable(observer => {
      let count = 0;
      const intervalo = setInterval(() => {
        count += 1;

        const output = {
          val: count
        };

        observer.next(output);

        // if (count === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (count === 2) {
        //   observer.error('AUXILIO!!!');
        // }

      }, 500);
    }).pipe(
      retry(2),
      map((resp: any) => {
        return Number(resp.val);
      }),
      filter((val, index) => {
        if ((val % 2) === 1) {
          return true;
        } else {
          return false;
        }
      })
    );
    return obs;
  }

}
