import { ThemeConfig, theme as antdTheme } from 'antd';
import { THEME_CONFIG_TOKEN } from './consts';
import { Event } from 'interface';

export const getTheme = (theme: 'light' | 'dark' = 'light'): ThemeConfig => ({
  algorithm:
    theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  token: THEME_CONFIG_TOKEN,
  components: {
    Layout: {
      headerHeight: 74,
      headerPadding: 21,
    },
    Typography: {
      fontSizeHeading1: 36,
      fontSizeHeading2: 28,
    },
    Button: {
      controlHeight: 40,
      fontWeight: 600,
      colorBorder: '#1F1646',
      borderColorDisabled: '#979797',
    },
    Input: {
      borderRadius: 2,
    },
    Card: {
      padding: 12,
      paddingLG: 20,
    },
    Select: {
      optionActiveBg: 'rgba(59, 212, 174, 0.3)',
    },
  },
});

export const cleanModelText = (texto: string) => {
  return texto.replace(/\s*\(.*?\)\s*/g, '').trim();
};

export const parseCity = (event: Event) => {
  return (
    event?.place?.city?.name ||
    event?._embedded?.venues?.[0]?.city?.name ||
    'Unknown City'
  );
};
