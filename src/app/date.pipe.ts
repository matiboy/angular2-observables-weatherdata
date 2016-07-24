import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import {Moment} from 'moment';

@Pipe({
  name: 'date'
})
export class MomentedDatePipe extends DatePipe {
  transform(value: Moment, pattern?: string): string {
    if(!value) {
      return '';
    }
    return super.transform(value.toDate(), pattern);
  }

}
