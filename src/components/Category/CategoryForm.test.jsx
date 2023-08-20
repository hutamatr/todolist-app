import { act, render, screen, userEventSetup } from 'test-utils';

import CategoryForm from './CategoryForm';

describe('Category Form Component', () => {
  test('render correctly', () => {
    render(<CategoryForm />);

    const categoryNameInputElement = screen.getByRole('textbox', {
      name: /category name/i,
    });
    const createCategoryButtonElement = screen.getByRole('button', {
      name: /create category/i,
    });
    const cancelButtonElement = screen.getByRole('button', { name: /cancel/i });

    expect(categoryNameInputElement).toBeInTheDocument();
    expect(createCategoryButtonElement).toBeInTheDocument();
    expect(cancelButtonElement).toBeInTheDocument();
  });

  test('input category name correctly', async () => {
    const { user } = userEventSetup(<CategoryForm />);

    const categoryNameInputElement = screen.getByRole('textbox', {
      name: /category name/i,
    });

    await act(() => user.type(categoryNameInputElement, 'learning'));
    expect(categoryNameInputElement).toHaveValue('learning');
  });
});
