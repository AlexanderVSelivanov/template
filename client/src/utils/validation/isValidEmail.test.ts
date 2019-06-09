import isValidEmail from './isValidEmail';

const validEmail = 'email@test.com';
const notValidEmail = 'wrong@email@test.com.';

describe('Email validation', () => {
  test('Valid email', () => {
    expect(isValidEmail(validEmail)).toBeTruthy();
  });
  test('Not valid email', () => {
    expect(isValidEmail(notValidEmail)).toBeFalsy();
  });
});
