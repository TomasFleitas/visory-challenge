import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { EventsResponse } from '../../../interfaces';


@Injectable({
  providedIn: 'root',
})
export class MockEventService {
  getEvents() {
    const mockResponse: EventsResponse = {
      _embedded: { events: [] },
      _links: { self: { href: '' } } as any,
      page: { size: 0, totalElements: 0, totalPages: 0, number: 0 },
    };
    return of(mockResponse);
  }
}
