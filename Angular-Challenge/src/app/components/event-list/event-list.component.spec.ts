import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventListComponent } from './event-list.component';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { Event } from '../../interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'parseCity' })
class MockParseCityPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return 'Mock City';
  }
}

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventListComponent, MockParseCityPipe],
      imports: [CommonModule, NzListModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading spinner when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();

    const loadingElement = fixture.nativeElement.querySelector('.ant-spin');
    expect(loadingElement).toBeTruthy();
  });

  it('should display events in the list', () => {
    const mockEvents: Partial<Event>[] = [
      {
        name: 'Event 1',
        dates: { start: { localDate: '2023-07-11' } },
        images: [{ url: 'http://example.com/image1.jpg' }],
        place: { city: { name: 'New York' } },
      },
      {
        name: 'Event 2',
        dates: { start: { localDate: '2023-07-12' } },
        images: [{ url: 'http://example.com/image2.jpg' }],
        place: { city: { name: 'Los Angeles' } },
      },
    ] as Partial<Event>[];

    component.events = mockEvents as Event[];
    fixture.detectChanges();

    const listItems = fixture.nativeElement.querySelectorAll('nz-list-item');
    expect(listItems.length).toBe(mockEvents.length);

    const firstItemText = listItems[0].textContent;
    expect(firstItemText).toContain('Event 1');
    expect(firstItemText).toContain('07/11/2023');
    expect(firstItemText).toContain('Mock City');

    const firstItemImage = listItems[0].querySelector('img');
    expect(firstItemImage.src).toBe('http://example.com/image1.jpg');
  });

  it('should apply customDateFormat and parseCity pipes correctly', () => {
    const mockEvent: Partial<Event> = {
      name: 'Event 1',
      dates: { start: { localDate: '2023-07-11' } },
      images: [{ url: 'http://example.com/image1.jpg' }],
      place: { city: { name: 'New York' } },
    } as Partial<Event>;

    component.events = [mockEvent as Event];
    fixture.detectChanges();

    const listItemDescription = fixture.nativeElement.textContent;
    expect(listItemDescription).toContain('07/11/2023 | Mock City');
  });

  it('should show event date correctly in the list', () => {
    const mockEvent: Partial<Event> = {
      name: 'Event 2',
      dates: { start: { localDate: '2023-07-12' } },
      images: [{ url: 'http://example.com/image2.jpg' }],
      place: { city: { name: 'Los Angeles' } },
    } as Partial<Event>;

    component.events = [mockEvent as Event];
    fixture.detectChanges();

    const listItemDescription = fixture.nativeElement.textContent;
    expect(listItemDescription).toContain('07/12/2023');
  });

  it('should show city correctly in the list', () => {
    const mockEvent: Partial<Event> = {
      name: 'Event 3',
      dates: { start: { localDate: '2023-07-13' } },
      images: [{ url: 'http://example.com/image3.jpg' }],
      place: { city: { name: 'San Francisco' } },
    } as Partial<Event>;

    component.events = [mockEvent as Event];
    fixture.detectChanges();

    const listItemDescription = fixture.nativeElement.textContent;
    expect(listItemDescription).toContain('Mock City');
  });

  it('should show date "07/11/2023" on the screen', () => {
    const mockEvent: Partial<Event> = {
      name: 'Event 4',
      dates: { start: { localDate: '2023-07-11' } },
      images: [{ url: 'http://example.com/image4.jpg' }],
      place: { city: { name: 'Boston' } },
    } as Partial<Event>;

    component.events = [mockEvent as Event];
    fixture.detectChanges();

    const listItemDescription = fixture.nativeElement.textContent;
    expect(listItemDescription).toContain('07/11/2023');
  });
});
