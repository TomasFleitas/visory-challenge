import { memo } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ROUTES_DATA, ROUTE } from './routeData';

export const Routers = memo(() => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTE.root} element={<Navigate to={ROUTE.home} />} />
        {ROUTES_DATA.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<>NOT FOUND</>} />
      </Routes>
    </Router>
  );
});
