import { act, render, screen, userEventSetup } from 'test-utils';

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

  test('button search click input value to be empty', async () => {
    const onSearchValue = jest.fn();
    const { user } = userEventSetup(
      <Search name="Todo" onSearchValue={onSearchValue} />
    );

    const searchButtonElement = screen.getByRole('button', { name: /search/i });
    const inputSearchElement = screen.getByPlaceholderText(/search todo/i);

    await act(() => user.type(inputSearchElement, 'test todo'));
    await act(() => user.click(searchButtonElement));

    expect(inputSearchElement).toHaveValue('');
  });
});
