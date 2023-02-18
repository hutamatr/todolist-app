import { render, screen } from 'test-utils';

import CategoryItem from './CategoryItem';

describe('Category Item Component', () => {
  test('render correctly', () => {
    render(<CategoryItem name="category-1" />);

    const categoryImageElement = screen.getByRole('img', {
      name: /category-img/i,
    });
    const categoryNameElement = screen.getByText(/category-1/i);

    expect(categoryImageElement).toBeInTheDocument();
    expect(categoryNameElement).toBeInTheDocument();
  });
});
