import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { EventService } from '../../services/event.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockEventFilterComponent } from './mocks/mock-event-filter.component';
import { MockEventListComponent } from './mocks/mock-event-list.component';
import { MockEventService } from './mocks/mock-event.service';
import { MockNzMessageService } from './mocks/mock-message.service';
import { FormFilterParams } from '../../interfaces';
import { throwError } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let eventService: EventService;
  let messageService: NzMessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MockEventFilterComponent,
        MockEventListComponent,
      ],
      imports: [CommonModule, HttpClientTestingModule],
      providers: [
        { provide: EventService, useClass: MockEventService },
        { provide: NzMessageService, useClass: MockNzMessageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    eventService = TestBed.inject(EventService);
    messageService = TestBed.inject(NzMessageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onFilterChanged and update events', () => {
    spyOn(eventService, 'getEvents').and.callThrough();
    spyOn(component, 'onFilterChanged').and.callThrough();

    const filterParams: FormFilterParams = {
      location: 'New York',
      startDate: new Date('2023-07-01'),
      endDate: new Date('2023-07-31'),
      sortBy: 'date',
      direction: 'asc',
    };

    component.onFilterChanged(filterParams);
    fixture.detectChanges();

    expect(component.onFilterChanged).toHaveBeenCalledWith(filterParams);
    expect(eventService.getEvents).toHaveBeenCalledWith(filterParams);
    expect(component.events.length).toBe(0);
  });

  it('should show error message on API error', () => {
    spyOn(eventService, 'getEvents').and.returnValue(
      throwError(() => new Error('API Error'))
    );
    spyOn(messageService, 'error');

    const filterParams: FormFilterParams = {
      location: 'New York',
      startDate: new Date('2023-07-01'),
      endDate: new Date('2023-07-31'),
      sortBy: 'date',
      direction: 'asc',
    };

    component.onFilterChanged(filterParams);
    fixture.detectChanges();

    expect(messageService.error).toHaveBeenCalledWith(
      'An error occurred while fetching events.'
    );
    expect(component.loading).toBeFalse();
  });
});
