import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { EventFilterModule } from '../../components/event-filter/event-filter.module';
import { EventListModule } from '../../components/event-list/event-list.module';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    EventFilterModule,
    EventListModule,
    NzMessageModule,
  ],
})
export class HomeModule {}
