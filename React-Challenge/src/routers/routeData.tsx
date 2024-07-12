import { HomePage } from 'pages';
import { ReactNode } from 'react';

export const ROUTE = {
  root: '/',
  home: '/home',
};

export type RouteObject = {
  path: string;
  element: ReactNode;
};

export const ROUTES_DATA = [
  {
    path: ROUTE.home,
    element: <HomePage />,
  },
];
