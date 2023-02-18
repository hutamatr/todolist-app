import { render, screen } from 'test-utils';

import CategoryDetails from './CategoryDetails.page';

describe('Category Details Page Component', () => {
  test('render correctly', async () => {
    render(<CategoryDetails />);

    const headingElement = screen.getByRole('heading', { level: 1 });

    expect(headingElement).toBeInTheDocument();
  });

  test('renders todo by category correctly', async () => {
    render(<CategoryDetails />);

    const listItemsElement = await screen.findAllByRole('listitem');

    expect(listItemsElement).toHaveLength(26);
  });
});
