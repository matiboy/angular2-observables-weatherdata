import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';
import {WeatherDataService, WeatherDataInterface} from './weather-data';
import * as moment from 'moment';
import {MomentedDatePipe} from './date.pipe';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [WeatherDataService],
  pipes: [MomentedDatePipe]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('previous') previous:ElementRef;
  @ViewChild('next') next:ElementRef;
  dayChanges$ = new Subject<number>();
  daysFromToday$ = this.dayChanges$.scan((ov, nv) => ov + nv, 0);
  currentDate$ = this.daysFromToday$.map(n => moment().add(n, 'days'));
  previousDate$ = this.currentDate$.map(m => m.clone().subtract(1, 'days'));
  nextDate$ = this.currentDate$.map(m => m.clone().add(1, 'days'));
  weatherData$ = this.currentDate$.switchMap(m => this.weatherData.loadData(m)).do(x=>console.log('In app', x)).share();
  constructor(private weatherData:WeatherDataService) {
  }

  ngAfterViewInit() {
    let previousButtonClicks$ = Observable.fromEvent(this.previous.nativeElement, 'click').map(_ => -1);
    let nextButtonClicks$ = Observable.fromEvent(this.next.nativeElement, 'click').map(_ => 1);
    Observable.merge(previousButtonClicks$, nextButtonClicks$).startWith(0).subscribe(this.dayChanges$);
  }
}
