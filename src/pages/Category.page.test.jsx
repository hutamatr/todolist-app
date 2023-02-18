import { render, screen, userEventSetup } from 'test-utils';

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

    expect(categoryListElement).toHaveLength(26);
  });

  test('delete category correctly', async () => {
    const { user } = userEventSetup(<Category />);

    await screen.findByText('Benton');
    const deleteButtonElement = await screen.findAllByTestId(
      /delete-category/i
    );

    await user.click(deleteButtonElement[0]);

    expect(screen.queryByText('Benton')).not.toBeInTheDocument();
  });
});
