import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: []
})
export class IncrementerComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() legend: string = 'Legend';
  @Input() progress: number = 50;

  @Output() changeValue: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onChanges(newvalue: number) {
    // const elementHTML: any = document.getElementsByName('progress')[0];
    if (newvalue >= 100) {
      this.progress = 100;
    } else if (newvalue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newvalue;
    }

    this.txtProgress.nativeElement.value = Number(this.progress);
    this.changeValue.emit(this.progress);
  }
  updateProgress(value: number) {

    if (this.progress >= 100 && value > 0) {
      this.progress = 100;
      return;
    }
    if (this.progress <= 0 && value < 0) {
      this.progress = 0;
      return;
    }
    this.progress += value;

    this.changeValue.emit(this.progress);
    this.txtProgress.nativeElement.focus();
  }

}
