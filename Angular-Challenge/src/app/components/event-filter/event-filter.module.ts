import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { EventFilterComponent } from './event-filter.component';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [EventFilterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzButtonModule,
    NzSelectModule
  ],
  exports: [EventFilterComponent],
})
export class EventFilterModule {}
