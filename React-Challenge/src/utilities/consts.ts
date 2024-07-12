import { AliasToken } from 'antd/es/theme/internal';

export const { VITE_APP_API_KEY, VITE_APP_API_URL } = import.meta.env;

export const DATE_FORMAT = 'MM/DD/YYYY';

export const THEME_CONFIG_TOKEN: Partial<AliasToken> = {
  fontFamily:
    "Montserrat, 'Kumbh Sans', 'Roboto', 'Helvetica Neue', sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  colorPrimary: '#3BD4AE',
  colorInfo: '#3BD4AE',
  colorSuccess: '#1CBE8E',
  colorError: '#F65353',
  green: '#1CBE8E',
  blue1: '#B4DFF3',
  blue2: '#A5D8F0',
  blue3: '#96D2EE',
  blue4: '#87CBEB',
  blue5: '#78C5E9',
  blue6: '#6ABFE7',
  blue7: '#5FABCF',
  blue8: '#5498B8',
  blue9: '#4A85A1',
  blue10: '#3F728A',
  yellow1: '#FBF6EB',
  yellow2: '#FAF4E7',
  yellow3: '#F9F2E3',
  yellow4: '#F8F0DF',
  yellow5: '#F7EEDB',
  yellow6: '#F7EDD8',
  yellow7: '#DED5C2',
  yellow8: '#C5BDAC',
  yellow9: '#ACA597',
  yellow10: '#948E81',
};
