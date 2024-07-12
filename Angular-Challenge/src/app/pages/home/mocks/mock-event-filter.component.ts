import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-event-filter',
  template: ''
})
export class MockEventFilterComponent {
  @Input() loading: boolean = false;
  @Output() filterChanged = new EventEmitter<any>();
}
