import { Component, AfterViewInit,trigger,
  state,
  style,
  transition,
  animate } from '@angular/core';
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
  pipes: [MomentedDatePipe],
  animations: [
    trigger('loadingState', [
      state('notloading', style({
        opacity: '1'
      })),
      state('loading',   style({
        opacity: '0.3'
      })),
      transition('loading <=> notloading', animate('150ms'))
    ])
  ]
})
export class AppComponent implements AfterViewInit {
  dayChanges$ = new Subject<number>();
  daysFromToday$ = this.dayChanges$.scan((ov, nv) => ov + nv, 0);
  currentDate$ = this.daysFromToday$.map(n => moment().add(n, 'days'));
  previousDate$ = this.currentDate$.map(m => m.clone().subtract(1, 'days'));
  nextDate$ = this.currentDate$.map(m => m.clone().add(1, 'days'));
  weatherData$ = this.currentDate$.switchMap(m => this.weatherData.loadData(m)).do(x=>console.log('In app', x)).share();
  loading$ = Observable.merge(
      this.dayChanges$.map(_ => true),
      this.weatherData$.map(_ => false)
  );
  hidden$ = this.loading$.map(b => b ? 'loading' : 'notloading');
  constructor(private weatherData:WeatherDataService) {
  }

  ngAfterViewInit() {
    this.dayChanges$.next(0);
  }
}
