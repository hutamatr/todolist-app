import { render, screen, userEventSetup, act } from 'test-utils';

import Sort from './Sort';

describe('Sort Component', () => {
  test('render correctly', () => {
    render(<Sort />);

    const sortSelectElement = screen.getByRole('combobox');

    expect(sortSelectElement).toBeInTheDocument();
  });

  test('render select correctly', async () => {
    const onSetSort = jest.fn();
    const { user } = userEventSetup(<Sort onSetSort={onSetSort} />);

    const sortSelectElement = screen.getByRole('combobox');

    await act(() => user.selectOptions(sortSelectElement, 'DESC'));

    expect(sortSelectElement).toHaveValue('DESC');
  });
});
