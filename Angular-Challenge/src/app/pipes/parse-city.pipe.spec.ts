import { ParseCityPipe } from './parse-city.pipe';
import { Event } from '../interfaces';

describe('ParseCityPipe', () => {
  let pipe: ParseCityPipe;

  beforeEach(() => {
    pipe = new ParseCityPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return city name from event.place.city.name', () => {
    const mockEvent: Partial<Event> = {
      place: { city: { name: 'New York' } },
    } as Partial<Event>;
    expect(pipe.transform(mockEvent as Event)).toBe('New York');
  });

  it('should return city name from event._embedded.venues[0].city.name', () => {
    const mockEvent: Partial<Event> = {
      _embedded: {
        venues: [{ city: { name: 'Los Angeles' } }],
      },
    } as Partial<Event>;
    expect(pipe.transform(mockEvent as Event)).toBe('Los Angeles');
  });

  it('should return "Unknown City" if no city name is found', () => {
    const mockEvent: Partial<Event> = {};
    expect(pipe.transform(mockEvent as Event)).toBe('Unknown City');
  });

  it('should return city name from event.place.city.name if both are present', () => {
    const mockEvent: Partial<Event> = {
      place: { city: { name: 'San Francisco' } },
      _embedded: {
        venues: [{ city: { name: 'Los Angeles' } }],
      },
    } as Partial<Event>;
    expect(pipe.transform(mockEvent as Event)).toBe('San Francisco');
  });

  it('should return city name from event._embedded.venues[0].city.name if event.place.city.name is not present', () => {
    const mockEvent: Partial<Event> = {
      _embedded: {
        venues: [{ city: { name: 'Los Angeles' } }],
      },
    } as Partial<Event>;
    expect(pipe.transform(mockEvent as Event)).toBe('Los Angeles');
  });
});
