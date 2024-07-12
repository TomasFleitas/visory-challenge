import axiosInstance from 'api';
import { AxiosResponse } from 'axios';
import { EventsResponse, GetEventsParams } from 'interface';
import { VITE_APP_API_KEY } from 'utilities';

const BASE_URL = '';

export const getEvents = (
  params?: GetEventsParams,
): Promise<AxiosResponse<EventsResponse>> => {
  return axiosInstance.get<EventsResponse>(BASE_URL, {
    params: {
      ...params,
      apikey: VITE_APP_API_KEY,
    },
  });
};
