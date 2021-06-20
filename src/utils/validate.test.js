import {checkValidation} from './validate.js';

describe('check validation', () => {
  test('It should check validation of correct form', () => {
    const expected = {
      nameIsValid: true,
      emailIsValid: true,
      passwordIsValid: true,
    };
    const data = checkValidation({
      name: 'Jeffrey',
      email: 'jeffrey@gmail.com',
      password: '1234567890',
    });
    expect(data).toEqual(expected);
  });

  test('It should be invalid when submitting name with empty string', () => {
    const expected = {
      nameIsValid: false,
      emailIsValid: true,
      passwordIsValid: true,
    };
    const data = checkValidation({
      name: '',
      email: 'jeffrey@gmail.com',
      password: '1234567890',
    });
    expect(data).toEqual(expected);
  });

  test('It should be invalid when submitting email with empty string', () => {
    const expected = {
      nameIsValid: true,
      emailIsValid: false,
      passwordIsValid: true,
    };
    const data = checkValidation({
      name: 'Jeffrey',
      email: '',
      password: '1234567890',
    });
    expect(data).toEqual(expected);
  });

  test('It should be invalid when submitting email without @', () => {
    const expected = {
      nameIsValid: true,
      emailIsValid: false,
      passwordIsValid: true,
    };
    const data = checkValidation({
      name: 'Jeffrey',
      email: 'hello world',
      password: '1234567890',
    });
    expect(data).toEqual(expected);
  });

  test('It should be invalid when submitting password with empty string', () => {
    const expected = {
      nameIsValid: true,
      emailIsValid: true,
      passwordIsValid: false,
    };
    const data = checkValidation({
      name: 'Jeffrey',
      email: 'jeffrey@gmail.com',
      password: '',
    });
    expect(data).toEqual(expected);
  });
});
