import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import EventFilter from '..';

const mockOnFilterChanged = jest.fn();

describe('EventFilter Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the form with all fields', () => {
    render(
      <EventFilter loading={false} onFilterChanged={mockOnFilterChanged} />,
    );

    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sort By/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Direction/i)).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });

  it('should call onFilterChanged with correct values on form submit', async () => {
    render(
      <EventFilter loading={false} onFilterChanged={mockOnFilterChanged} />,
    );

    fireEvent.change(screen.getByLabelText(/Location/i), {
      target: { value: 'New York' },
    });
    fireEvent.change(screen.getByLabelText(/Sort By/i), {
      target: { value: 'name' },
    });

    fireEvent.mouseDown(screen.getByLabelText(/Direction/i));
    fireEvent.click(screen.getByText(/Ascending/i));

    fireEvent.click(screen.getByText(/Search/i));

    await waitFor(() => {
      expect(mockOnFilterChanged).toHaveBeenCalledWith({
        city: 'New York',
        sortBy: 'date',
        direction: 'asc',
        startDate: undefined,
        endDate: undefined,
      });
    });
  });

  it('should loading search button when loading param is true', () => {
    render(
      <EventFilter loading={true} onFilterChanged={mockOnFilterChanged} />,
    );

    const searchButton = screen.getByText(/Search/i);
    expect(searchButton.closest('button')).toHaveClass("ant-btn-loading button");
  });
});
