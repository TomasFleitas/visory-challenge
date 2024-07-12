import { memo } from 'react';
import { List, Avatar } from 'antd';
import { Event } from 'interface';
import { DATE_FORMAT, parseCity } from 'utilities';
import dayjs from 'dayjs';

type EventListProps = {
  events: Event[];
  loading: boolean;
};

export const EventList = memo(({ events, loading }: EventListProps) => {
  return (
    <List
      loading={loading}
      itemLayout="vertical"
      size="large"
      dataSource={events}
      renderItem={(event) => (
        <List.Item
          key={event.id}
          extra={<img width={100} alt={event.name} src={event.images[0].url} />}
        >
          <List.Item.Meta
            avatar={<Avatar src={event.images[0].url} />}
            title={event.name}
            description={
              <>
                <p>{`${dayjs(event.dates.start.dateTime).format(DATE_FORMAT)} | ${parseCity(event)}`}</p>
              </>
            }
          />
        </List.Item>
      )}
    />
  );
});

export default EventList;
