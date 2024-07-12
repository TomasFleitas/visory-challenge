import '@testing-library/jest-dom';

jest.mock('src/utilities', () => ({
  parseCity: (value) =>
    value?.place?.city?.name ||
    value?._embedded?.venues?.[0]?.city?.name ||
    'Unknown City',
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
