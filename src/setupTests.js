import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const localStorageMock = {
  getItem: () => null,
  setItem: () => null,
  clear: () => null
};
global.localStorage = localStorageMock;
