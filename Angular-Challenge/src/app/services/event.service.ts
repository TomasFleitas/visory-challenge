import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import dayjs from 'dayjs';
import { EventsResponse, FormFilterParams } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = environment.ticketmasterApiUrl;
  private apiKey = environment.ticketmasterApiKey;

  constructor(private http: HttpClient) {}

  getEvents({
    direction,
    endDate,
    location,
    sortBy,
    startDate,
  }: FormFilterParams): Observable<EventsResponse> {
    let params = new HttpParams().set('apikey', this.apiKey);

    if (location) {
      params = params.set('city', location);
    }

    if (sortBy && direction) {
      params = params.set('sort', `${sortBy},${direction}`);
    }

    if (startDate) {
      params = params.set(
        'startDateTime',
        dayjs(startDate).format('YYYY-MM-DDTHH:mm:ssZ')
      );
    }

    if (endDate) {
      params = params.set(
        'endDateTime',
        dayjs(endDate).format('YYYY-MM-DDTHH:mm:ssZ')
      );
    }

    return this.http.get<EventsResponse>(this.apiUrl, { params });
  }
}
