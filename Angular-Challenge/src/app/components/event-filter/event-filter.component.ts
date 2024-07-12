import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import dayjs from 'dayjs';
import { FormFilterParams } from '../../interfaces';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.scss'],
})
export class EventFilterComponent {
  filterForm: FormGroup;
  @Output() filterChanged = new EventEmitter<FormFilterParams>();
  @Input() loading: boolean = false;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      location: [''],
      startDate: [null],
      endDate: [null],
      sortBy: ['date'],
      direction: ['desc'],
    });
  }

  onStartDateChange(date: Date): void {
    if (date) {
      this.filterForm.get('endDate')?.updateValueAndValidity();
    }
  }

  onEndDateChange(date: Date): void {
    if (date) {
      this.filterForm.get('startDate')?.updateValueAndValidity();
    }
  }

  disabledStartDate = (startValue: Date): boolean => {
    const endDate = this.filterForm.get('endDate')?.value;
    if (!startValue || !endDate) {
      return false;
    }
    return dayjs(startValue).isAfter(dayjs(endDate));
  };

  disabledEndDate = (endValue: Date): boolean => {
    const startDate = this.filterForm.get('startDate')?.value;
    if (!endValue || !startDate) {
      return false;
    }
    return dayjs(endValue).isBefore(dayjs(startDate));
  };

  onSubmit(): void {
    if (this.filterForm.valid) {
      const formValues = this.filterForm.value;
      this.filterChanged.emit({
        ...formValues,
      });
    }
  }
}
