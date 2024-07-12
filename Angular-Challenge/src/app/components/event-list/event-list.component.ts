import { Component, Input } from '@angular/core';
import { Event } from '../../interfaces';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent {
  @Input() events: Event[] = [];
  @Input() loading: boolean = false;
}
