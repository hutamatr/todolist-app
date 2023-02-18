import { render, screen } from 'test-utils';
import CategoryFormModal from './CategoryFormModal';

describe('Category Form Modal Component', () => {
  test('not show modal on first render', () => {
    render(<CategoryFormModal />);

    const categoryHeadingElement = screen.queryByRole('heading', { level: 1 });
    expect(categoryHeadingElement).not.toBeInTheDocument();
  });
});
