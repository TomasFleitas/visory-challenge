import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event, FormFilterParams } from '../../interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  events: Event[] = [];
  loading: boolean = false;

  constructor(
    private eventService: EventService,
    private message: NzMessageService
  ) {}

  onFilterChanged(filter: FormFilterParams): void {
    this.loading = true;
    this.events = [];

    this.eventService
      .getEvents(filter)
      .pipe(
        tap((response) => {
          this.events = response._embedded?.events || [];
        }),
        catchError((error) => {
          console.error(error);
          this.message.error('An error occurred while fetching events.');
          return of([]);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }
}
