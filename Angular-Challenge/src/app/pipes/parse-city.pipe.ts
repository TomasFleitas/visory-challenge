import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../interfaces';

@Pipe({
  name: 'parseCity',
})
export class ParseCityPipe implements PipeTransform {
  transform(event?: Event): string {
    return event?.place?.city?.name || event?._embedded?.venues?.[0]?.city?.name || 'Unknown City';
  }
}
