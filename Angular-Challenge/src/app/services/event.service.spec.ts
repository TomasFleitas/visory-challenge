import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventService } from './event.service';
import { environment } from '../../environments/environment';
import { EventsResponse, FormFilterParams } from '../interfaces';
import dayjs from 'dayjs';

describe('EventService', () => {
  let service: EventService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService]
    });
    service = TestBed.inject(EventService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the API with correct parameters', () => {
    const mockResponse: EventsResponse = {
      _embedded: { events: [] },
      _links: { self: { href: '' } } as any,
      page: { size: 0, totalElements: 0, totalPages: 0, number: 0 },
    };

    const filterParams: FormFilterParams = {
      location: 'New York',
      startDate: new Date('2023-07-01'),
      endDate: new Date('2023-07-31'),
      sortBy: 'date',
      direction: 'asc',
    };

    service.getEvents(filterParams).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne((request) => {
      return (
        request.url === environment.ticketmasterApiUrl &&
        request.params.get('apikey') === environment.ticketmasterApiKey &&
        request.params.get('city') === 'New York' &&
        request.params.get('startDateTime') ===
          dayjs(filterParams.startDate).format('YYYY-MM-DDTHH:mm:ssZ') &&
        request.params.get('endDateTime') ===
          dayjs(filterParams.endDate).format('YYYY-MM-DDTHH:mm:ssZ') &&
        request.params.get('sort') === 'date,asc'
      );
    });

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call the API without optional parameters', () => {
    const mockResponse: EventsResponse = {
      _embedded: { events: [] },
      _links: { self: { href: '' } } as any,
      page: { size: 0, totalElements: 0, totalPages: 0, number: 0 },
    };

    const filterParams: FormFilterParams = {
      location: 'New York',
      startDate: undefined,
      endDate: undefined,
      sortBy: undefined,
      direction: undefined,
    };

    service.getEvents(filterParams).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne((request) => {
      return (
        request.url === environment.ticketmasterApiUrl &&
        request.params.get('apikey') === environment.ticketmasterApiKey &&
        request.params.get('city') === 'New York' &&
        !request.params.has('startDateTime') &&
        !request.params.has('endDateTime') &&
        !request.params.has('sort')
      );
    });

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
