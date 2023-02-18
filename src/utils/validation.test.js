import validation from './validation';

describe('Validation function', () => {
  test('running correctly', () => {
    const { userNameValidation, emailValidation, passwordValidation } =
      validation();

    expect(userNameValidation.test('testing')).toBeTruthy();
    expect(userNameValidation.test('testing,,.')).toBeFalsy();
    expect(userNameValidation.test('tes')).toBeFalsy();

    expect(emailValidation.test('testing@gmail.com')).toBeTruthy();
    expect(emailValidation.test('testing')).toBeFalsy();

    expect(passwordValidation.test('Testing123')).toBeTruthy();
    expect(passwordValidation.test('testing123')).toBeFalsy();
  });
});
