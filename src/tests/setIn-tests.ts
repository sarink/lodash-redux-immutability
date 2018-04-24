import { assert } from 'chai';

import { setIn } from 'src/lodash-redux-immutability/lodash-redux-immutability';


describe('setIn', () => {
  it('can set objects when path is empty', () => {
    const startState = { a: 1, b: 3 };
    const endState = setIn(startState, [], { a: 'a' });
    assert.deepEqual(endState, {
      a: 'a',
    });
  });

  it('can set (replace) primitives', () => {
    const startState = { a: 1, b: 3 };
    const endState = setIn(startState, ['a'], 'a');
    assert.deepEqual(endState, {
      a: 'a',
      b: 3,
    });
  });

  it('can set (replace) nested objects', () => {
    const startState = {
      a: 1,
      b: {
        ba: 2,
        bb: 3,
        bc: {
          bca: 4,
          bcb: 5,
        },
        bd: {
          bda: 6,
        },
      },
      c: 7,
    };
    const endState = setIn(startState, ['b', 'bc'], { bca: 44, bcc: 8 });
    assert.deepEqual(endState, {
      a: 1,
      b: {
        ba: 2,
        bb: 3,
        bc: {
          bca: 44,
          bcc: 8,
        },
        bd: {
          bda: 6,
        },
      },
      c: 7,
    });
  });

  it('can set a nested key while only changing necessary references', () => {
    const startState = {
      a: 1,
      b: {
        ba: 2,
        bb: 3,
        bc: {
          bca: 4,
          bcb: 5,
        },
        bd: {
          bda: 6,
        },
      },
      c: 7,
    };
    const endState = setIn(startState, ['b', 'bc'], { bca: 44, bcc: 8 });
    assert.deepEqual(endState, {
      a: 1,
      b: {
        ba: 2,
        bb: 3,
        bc: {
          bca: 44,
          bcc: 8,
        },
        bd: {
          bda: 6,
        },
      },
      c: 7,
    });
    // Should only update references to every reference on the 'path', and no others
    assert.notStrictEqual(startState, endState);
    assert.notStrictEqual(startState.b, endState.b);
    assert.notStrictEqual(startState.b.bc, endState.b.bc);
    assert.strictEqual(startState.b.bd, endState.b.bd);
  });
});
