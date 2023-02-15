import { render, screen } from 'test-utils';

import ProfilePicture from './ProfilePicture';

describe('Profile Picture Component', () => {
  test('render correctly', () => {
    render(<ProfilePicture />);

    const imageElement = screen.getByRole('img');

    expect(imageElement).toBeInTheDocument();
  });
});
