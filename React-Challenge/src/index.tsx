import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Routers } from './routers';
import './index.scss';
import { getTheme } from 'utilities';
import enUs from 'antd/locale/en_US';
import { App, ConfigProvider } from 'antd';

const root = document.getElementById('root');

if (!root) throw new Error('Not Found root div');

createRoot(root).render(
  <StrictMode>
    <ConfigProvider theme={getTheme()} locale={enUs}>
      <App className="main-ant-app">
        <Routers />
      </App>
    </ConfigProvider>
  </StrictMode>,
);
