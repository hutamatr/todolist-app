import { render, screen, userEventSetup, act } from 'test-utils';

import Search from './Search';

describe('Search Component', () => {
  test('render search by placeholder correctly', () => {
    render(<Search name="Todo" />);

    const inputSearchElement = screen.getByPlaceholderText(/search todo/i);
    const buttonElement = screen.getByRole('button', { name: /search/i });

    expect(inputSearchElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('render search input value correctly', async () => {
    const { user } = userEventSetup(<Search name="Todo" />);

    const inputSearchElement = screen.getByPlaceholderText(/search todo/i);

    await act(() => user.type(inputSearchElement, 'test todo'));

    expect(inputSearchElement).toHaveValue('test todo');
  });
});
