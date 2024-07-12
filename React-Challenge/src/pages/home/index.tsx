import { memo } from 'react';
import { EventFilter, EventList } from 'components';
import { useGetEvents } from 'hooks/useGetEvents';
import style from './index.module.scss';

export const HomePage = memo(() => {
  const { loading, fetchEvents, events } = useGetEvents();

  return (
    <div className={style.home}>
      <EventFilter loading={loading} onFilterChanged={fetchEvents} />
      <EventList loading={loading} events={events} />
    </div>
  );
});

export default HomePage;
