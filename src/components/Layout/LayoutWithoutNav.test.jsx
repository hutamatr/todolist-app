import { render, screen } from 'test-utils';

import LayoutWithoutNav from './LayoutWithoutNav';

describe('Layout Without Nav Component', () => {
  test('render correctly', () => {
    render(<LayoutWithoutNav />);

    const mainElement = screen.getByRole('main');

    expect(mainElement).toBeInTheDocument();
  });

  test('render image correctly', () => {
    render(<LayoutWithoutNav />);

    const figureElement = screen.getByRole('figure');

    expect(figureElement).toBeInTheDocument();
  });
});
