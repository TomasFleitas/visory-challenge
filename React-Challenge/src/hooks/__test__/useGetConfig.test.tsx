import dayjs from 'dayjs';
import { renderHook, waitFor } from '@testing-library/react';
import { useGetEvents } from 'hooks/useGetEvents';
import { act } from 'react-dom/test-utils';
import { FormFilterParams } from 'interface';

import * as apis from 'api';
import { message } from 'antd';

jest.mock('api', () => ({
  getEvents: jest.fn(),
}));

jest.mock('antd', () => ({
  message: {
    error: jest.fn(),
  },
}));

describe('useGetEvents', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with loading as false and events as undefined', () => {
    const { result } = renderHook(() => useGetEvents());

    expect(result.current.loading).toBe(false);
    expect(result.current.events).toBeUndefined();
  });

  it('should set loading to true when fetchEvents is called', async () => {
    const { result } = renderHook(() => useGetEvents());

    act(() => {
      result.current.fetchEvents({ city: 'New York' });
    });

    expect(result.current.loading).toBe(true);
  });

  it('should fetch events and set them correctly', async () => {
    const mockEvents = [
      { id: '1', name: 'Event 1' },
      { id: '2', name: 'Event 2' },
    ];

    jest.spyOn(apis, 'getEvents').mockResolvedValueOnce({
      data: {
        _embedded: { events: mockEvents },
      },
    } as any);

    const { result } = renderHook(() => useGetEvents());

    act(() => {
      result.current.fetchEvents({ city: 'New York' });
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.events).toEqual(mockEvents);
    });
  });

  it('should handle errors correctly', async () => {
    const errorMessage = 'An error occurred while fetching events.';

    (apis.getEvents as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useGetEvents());

    act(() => {
      result.current.fetchEvents({ city: 'New York' });
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.events).toEqual([]);
      expect(message.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  it('should format dates correctly in the API call', async () => {
    const mockEvents = [
      { id: '1', name: 'Event 1' },
      { id: '2', name: 'Event 2' },
    ];

    (apis.getEvents as jest.Mock).mockResolvedValueOnce({
      data: {
        _embedded: { events: mockEvents },
      },
    });

    const { result } = renderHook(() => useGetEvents());

    const formValues: FormFilterParams = {
      city: 'New York',
      startDate: new Date('2024-07-01'),
      endDate: new Date('2024-07-31'),
      sortBy: 'date',
      direction: 'asc',
    };

    act(() => {
      result.current.fetchEvents(formValues);
    });

    const expectedParams = {
      city: 'New York',
      startDate: dayjs(formValues.startDate).format('YYYY-MM-DDTHH:mm:ssZ'),
      endDateTime: dayjs(formValues.endDate).format('YYYY-MM-DDTHH:mm:ssZ'),
      sort: 'date,asc',
    };

    await waitFor(() => {
      expect(apis.getEvents).toHaveBeenCalledWith(expectedParams);
      expect(result.current.loading).toBe(false);
      expect(result.current.events).toEqual(mockEvents);
    });
  });
});
