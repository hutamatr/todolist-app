import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import ContextProvider from './context/ContextProvider';

const queryClient = new QueryClient();

// eslint-disable-next-line react-refresh/only-export-components
const AllProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ContextProvider>{children}</ContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export function userEventSetup(jsx, options) {
  return {
    user: userEvent.setup(),
    ...customRender(jsx, options),
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { customRender as render };
