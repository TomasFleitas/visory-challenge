import { render, screen } from '@testing-library/react';
import EventList from '..';
import { Event } from 'interface';

const mockEvents: Partial<Event>[] = [
  {
    id: '1',
    name: 'Event 1',
    dates: { start: { dateTime: '2024-07-02T00:00:00Z' } },
    images: [{ url: 'http://example.com/image1.jpg' }],
    _embedded: { venues: [{ city: { name: 'New York' } }] },
  },
  {
    id: '2',
    name: 'Event 2',
    dates: { start: { dateTime: '2024-07-03T00:00:00Z' } },
    images: [{ url: 'http://example.com/image2.jpg' }],
    _embedded: { venues: [{ city: { name: 'Los Angeles' } }] },
  },
] as Partial<Event>[];

describe('EventList Component', () => {
  it('should render loading state', () => {
    const { container } = render(<EventList events={[]} loading={true} />);

    const loadingElement = container.querySelector(
      '.ant-spin-dot.ant-spin-dot-spin',
    );
    expect(loadingElement).toBeInTheDocument();
  });

  it('should render list of events', () => {
    render(<EventList events={mockEvents as Event[]} loading={false} />);

    const eventItems = screen.getAllByRole('listitem');
    expect(eventItems.length).toBe(2);

    expect(screen.getByText(/Event 1/i)).toBeInTheDocument();
    expect(
      screen.getByText('2024-07-01T21:00:00-03:00 | New York'),
    ).toBeInTheDocument();

    const secondEventImage = screen.getByAltText('Event 2');
    expect(secondEventImage).toBeInTheDocument();
    expect(secondEventImage).toHaveAttribute(
      'src',
      'http://example.com/image2.jpg',
    );
  });
});
