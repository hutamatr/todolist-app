import { render, screen } from 'test-utils';

import TodoList from './TodoList';
import { todosData } from 'mocks/testingData';

describe('Todo List Component', () => {
  test('render list correctly', () => {
    render(<TodoList todosData={todosData} />);

    const listElement = screen.getAllByRole('listitem');

    expect(listElement).toHaveLength(5);
  });
});
