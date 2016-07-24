/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { WeatherDataService } from './weather-data.service';

describe('Service: WeatherDataService', () => {
  beforeEach(() => {
    addProviders([WeatherDataService]);
  });

  it('should ...',
    inject([WeatherDataService],
      (service: WeatherDataService) => {
        expect(service).toBeTruthy();
      }));
});
