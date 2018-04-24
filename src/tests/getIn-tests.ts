import { assert } from 'chai';

import { getIn } from 'src/lodash-redux-immutability/lodash-redux-immutability';


describe('getIn', () => {
  it('returns the object if the path is empty', () => {
    const state = { a: 1, b: 2 };
    const result = getIn(state, []);
    assert.strictEqual(state, result);
  });
});
