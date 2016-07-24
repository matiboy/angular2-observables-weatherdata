/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { MomentedDatePipe } from './date.pipe';

describe('Pipe: Date', () => {
  it('create an instance', () => {
    let pipe = new MomentedDatePipe();
    expect(pipe).toBeTruthy();
  });
});
