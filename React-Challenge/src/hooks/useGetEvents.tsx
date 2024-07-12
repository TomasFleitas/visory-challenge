import { message } from 'antd';
import { getEvents } from 'api';
import dayjs from 'dayjs';
import { Event, FormFilterParams, GetEventsParams } from 'interface';
import { useCallback, useState } from 'react';

export const useGetEvents = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>();

  const fetchEvents = useCallback(async (formValue: FormFilterParams) => {
    setLoading(true);
    try {
      setEvents([]);
      const params: GetEventsParams = {
        city: formValue.city,
        ...(formValue.endDate && {
          endDateTime: dayjs(formValue.endDate).format('YYYY-MM-DDTHH:mm:ssZ'),
        }),
        ...(formValue.startDate && {
          startDate: dayjs(formValue.startDate).format('YYYY-MM-DDTHH:mm:ssZ'),
        }),
        sort: `${formValue.sortBy},${formValue.direction}`,
      };

      const { data } = await getEvents(params);
      setEvents(data?._embedded?.events || []);
    } catch (error) {
      console.log(error);
      message.error('An error occurred while fetching events.');
      console.error('An error occurred while fetching events.', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchEvents,
    loading,
    events,
  };
};
