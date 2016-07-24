import { Component, AfterViewInit } from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';
import {WeatherDataService, WeatherDataInterface} from './weather-data';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [WeatherDataService]
})
export class AppComponent implements AfterViewInit {
  constructor(private weatherData:WeatherDataService) {}

  ngAfterViewInit() {

  }
}
