import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { EventListComponent } from './event-list.component';
import { ParseCityPipe } from '../../pipes/parse-city.pipe';

@NgModule({
  declarations: [EventListComponent, ParseCityPipe],
  imports: [CommonModule, NzListModule],
  exports: [EventListComponent],
})
export class EventListModule {}
