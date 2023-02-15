import { render, screen, userEventSetup, act } from 'test-utils';

import Pagination from './Pagination';

describe('Pagination Component', () => {
  test('render correctly', () => {
    const onSetPageSize = jest.fn();
    render(
      <Pagination
        totalCount={10}
        currentPage={1}
        siblingCount={1}
        pageSize={5}
        onSetPageSize={onSetPageSize}
      />
    );

    const selectElement = screen.getByRole('combobox');
    const paginationRangeElement = screen.getAllByRole('listitem');
    const buttonElement = screen.getAllByRole('button');

    expect(selectElement).toBeInTheDocument();
    expect(paginationRangeElement).toHaveLength(4);
    expect(buttonElement[0]).toBeDisabled();
    expect(buttonElement[1]).toBeInTheDocument();
  });

  test('todo per page input render correctly', async () => {
    const onSetPageSize = jest.fn();
    const onSetScrollPosition = jest.fn();

    const { user } = userEventSetup(
      <Pagination
        totalCount={20}
        currentPage={1}
        siblingCount={1}
        pageSize={10}
        onSetPageSize={onSetPageSize}
        onSetScrollPosition={onSetScrollPosition}
      />
    );

    const selectElement = screen.getByRole('combobox');

    await act(() => user.selectOptions(selectElement, '10'));

    expect(selectElement).toHaveValue('10');
  });
});
