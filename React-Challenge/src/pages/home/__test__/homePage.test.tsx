import { render, screen } from '@testing-library/react';
import { HomePage } from '..';
import * as hooks from 'hooks/useGetEvents';

jest.mock('components', () => ({
  EventFilter: ({ loading, onFilterChanged }) => (
    <div>
      <input
        data-testid="event-filter"
        disabled={loading}
        onChange={onFilterChanged}
      />
    </div>
  ),
  EventList: ({ loading, events }) => (
    <div>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <ul data-testid="event-list">
          {events.map((event) => (
            <li key={event.id}>{event.name}</li>
          ))}
        </ul>
      )}
    </div>
  ),
}));

describe('HomePage Component', () => {
  it('should render loading state', () => {
    jest.spyOn(hooks, 'useGetEvents').mockReturnValue({
      loading: true,
      fetchEvents: jest.fn(),
      events: [],
    });

    render(<HomePage />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(screen.getByTestId('event-filter')).toBeDisabled();
  });

  it('should render list of events', () => {
    const mockEvents: any = [
      { id: '1', name: 'Event 1' },
      { id: '2', name: 'Event 2' },
    ];
    jest.spyOn(hooks, 'useGetEvents').mockReturnValue({
      loading: false,
      fetchEvents: jest.fn(),
      events: mockEvents,
    });

    render(<HomePage />);

    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    const eventItems = screen.getAllByRole('listitem');
    expect(eventItems.length).toBe(2);
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
  });
});
