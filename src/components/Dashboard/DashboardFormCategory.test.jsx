import { categoriesData } from '@mocks/handlers';
import { render, screen } from 'test-utils';

import DashboardFormCategory from './DashboardFormCategory';

describe('Dashboard Form Category Component', () => {
  test('render category list correctly', async () => {
    render(<DashboardFormCategory dataCategories={categoriesData} />);

    const categoriesListElement = await screen.findAllByRole('listitem');

    expect(categoriesListElement).toHaveLength(20);
  });

  test('if category not added render warning', () => {
    render(<DashboardFormCategory isCategoryNotAdded={true} />);

    const categoryNotAddedElement = screen.getByText(
      /category must be added!/i
    );

    expect(categoryNotAddedElement).toBeInTheDocument();
  });

  test('render loading', () => {
    render(<DashboardFormCategory isLoadingCategories={true} />);

    const loadingElement = screen.getByText(/loading/i);

    expect(loadingElement).toBeInTheDocument();
  });

  test('render add category button correctly', () => {
    render(<DashboardFormCategory />);

    const buttonElement = screen.getByRole('button', { name: /add category/i });

    expect(buttonElement).toBeInTheDocument();
  });
});
