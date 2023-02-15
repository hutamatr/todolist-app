import { render, screen } from 'test-utils';

import TodoItem from './TodoItem';

describe('Todo Item Component', () => {
  test('render todo item correctly', () => {
    render(
      <TodoItem
        title={'learning'}
        description={'learning react & tailwind'}
        category={{ name: 'category-1' }}
      />
    );
    const titleElement = screen.getByRole('heading', { level: 2 });
    const descriptionElement = screen.getByText(/learning react & tailwind/i);

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
