import { render, screen, userEventSetup } from 'test-utils';

import Profile from './Profile.page';

describe('Profile Page Component', () => {
  test('render heading correctly', async () => {
    render(<Profile />);

    const profileHeadingElement = screen.getByRole('heading', { level: 1 });

    expect(profileHeadingElement).toBeInTheDocument();
  });
  test('render input value correctly', async () => {
    const { user } = userEventSetup(<Profile />);
    const usernameLabelElement = screen.getByLabelText(/username/i);

    await user.type(usernameLabelElement, 'testing');

    expect(usernameLabelElement).toHaveValue('testing');
  });
  test('if button edit profile, show password input', async () => {
    const { user } = userEventSetup(<Profile />);

    const editFormButtonElement = screen.getByRole('button', {
      name: /edit profile/i,
    });

    expect(editFormButtonElement).toBeInTheDocument();

    await user.click(editFormButtonElement);

    const passwordInputElement = await screen.findByLabelText(
      'Confirm Password'
    );

    expect(passwordInputElement).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /save profile/i })
    ).toBeInTheDocument();
  });
});
