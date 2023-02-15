import { render, screen } from 'test-utils';

import Category from './Category.page';

describe('Category Page Component', () => {
  test('render correctly', () => {
    render(<Category />);

    const categoryHeadingElement = screen.getByRole('heading', {
      name: /category/i,
    });

    expect(categoryHeadingElement).toBeInTheDocument();
  });

  test('render category list correctly', async () => {
    render(<Category />);

    const categoryListElement = await screen.findAllByRole('listitem');

    expect(categoryListElement).toHaveLength(8);
  });
});
