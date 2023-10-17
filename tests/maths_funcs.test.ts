import { add } from '../src/maths_funcs';

describe('Testing add function', () => {
  test('One plus one is two', () => {
    expect(add(1,1,)).toBe(2);
  });
});