import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-list',
  template: ''
})
export class MockEventListComponent {
  @Input() loading: boolean = false;
  @Input() events: any[] = [];
}
