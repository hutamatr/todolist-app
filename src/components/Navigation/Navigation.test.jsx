import { render, screen } from 'test-utils';

import Navigation from './Navigation';

describe('Navigation Component', () => {
  test('render correctly', () => {
    render(<Navigation />);

    const navigationElement = screen.getByRole('navigation');
    const ulElement = screen.getAllByRole('list');
    const liElement = screen.getAllByRole('listitem');

    const listItems = liElement.map((item) => item.textContent);

    expect(navigationElement).toBeInTheDocument();
    expect(ulElement).toHaveLength(2);
    expect(liElement).toHaveLength(7);
    expect(listItems).toMatchInlineSnapshot(`
      Array [
        "Home",
        "Dashboard",
        "Category",
        "Profile",
        "Logout",
        "Profile",
        "Logout",
      ]
    `);
  });
});
