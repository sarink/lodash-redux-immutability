import { assert } from 'chai';

import { updateIn } from 'src/lodash-redux-immutability/lodash-redux-immutability';


describe('updateIn', () => {
  it('can update via object with an empty path', () => {
    const startState = { a: 1, b: 3 };
    const endState = updateIn(startState, [], { a: 2, c: 4 });
    assert.deepEqual(endState, {
      a: 2,
      b: 3,
      c: 4,
    });
  });

  it('can update a nested key while only changing necessary references', () => {
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
    const endState = updateIn(startState, ['b', 'bc'], { bca: 44, bcc: 8 });
    assert.deepEqual(endState, {
      a: 1,
      b: {
        ba: 2,
        bb: 3,
        bc: {
          bca: 44,
          bcb: 5,
          bcc: 8,
        },
        bd: {
          bda: 6,
        },
      },
      c: 7,
    });
    assert.notStrictEqual(startState, endState);
    assert.notStrictEqual(startState.b, endState.b);
    assert.notStrictEqual(startState.b.bc, endState.b.bc);
    assert.strictEqual(startState.b.bd, endState.b.bd);
  });

  it('can update a nested key with missing "levels"', () => {
    const startState = {
      a: {
        aa: 1,
      },
      b: {
        ba: 97,
      },
    };
    const endState = updateIn(startState, ['b', 'bb', 'bba'], { bbaa: 98, bbab: 99 });
    assert.deepEqual(endState, {
      a: {
        aa: 1,
      },
      b: {
        ba: 97,
        bb: {
          bba: {
            bbaa: 98,
            bbab: 99,
          },
        },
      },
    });
    assert.notStrictEqual(startState, endState);
    assert.strictEqual(startState.a, endState.a);
    assert.strictEqual(startState.a.aa, endState.a.aa);
    assert.strictEqual(startState.b.ba, endState.b.ba);
    assert.notStrictEqual(startState.b, endState.b);
  });

  it('can update a nested key with an array index', () => {
    const startState = {
      a: 'a',
      b: [
        { c: 'c' },
        { d: [{ val: 0 }, { val: 1 }] },
      ],
    };
    const endState = updateIn(startState, ['b', 1, 'd', '0'], { newVal: 90 });
    assert.deepEqual(endState, {
      a: 'a',
      b: [
        { c: 'c' },
        { d: [{ val: 0, newVal: 90 }, { val: 1 }] },
      ],
    });
  });

  it('will create arrays for missing keys which are numbers', () => {
    const startState = {
      a: 'a',
    };
    const endState = updateIn(startState, ['b', 0], { c: 'c' });
    assert.deepEqual(endState, {
      a: 'a',
      b: [
        { c: 'c' },
      ],
    });
  });

  it('will create missing numerical object keys when path is a string-number', () => {
    const startState = {
      a: 'a',
    };
    const endState = updateIn(startState, ['b', '0'], { c: 'c' });
    assert.deepEqual(endState, {
      a: 'a',
      b: {
        0: {
          c: 'c',
        },
      },
    });
  });

  it('can mix string-numbers for object keys and real numbers for (sparse) array keys (1)', () => {
    const startState = {
      a: 'a',
      b: {},
    };
    const endState = updateIn(startState, ['b', '0', 'c', 1], { d: 'd' });
    assert.deepEqual(endState, {
      a: 'a',
      b: {
        0: {
          c: [undefined, { d: 'd' }],
        },
      },
    });
    assert.notStrictEqual(startState, endState);
    assert.strictEqual(startState.a, endState.a);
    assert.notStrictEqual(startState.b, endState.b);
  });

  it('can mix string-numbers for object keys and real numbers for (sparse) array keys (2)', () => {
    const startState = {
      a: 'a',
    };
    const endState = updateIn(startState, ['b', 0, 'c', 1], { d: 'd' });
    assert.notDeepEqual(endState, {
      a: 'a',
      b: {
        0: {
          c: [undefined, { d: 'd' }],
        },
      },
    });
    assert.notStrictEqual(startState, endState);
    assert.strictEqual(startState.a, endState.a);
  });

  it('will use numerical object keys when path is a string-number', () => {
    const startState = {
      a: 'a',
      b: {
        0: {
          c: 'c',
        },
      },
    };
    const endState = updateIn(startState, ['b', '0'], { d: 'd' });
    assert.deepEqual(endState, {
      a: 'a',
      b: {
        0: {
          c: 'c',
          d: 'd',
        },
      },
    });
    assert.notStrictEqual(startState, endState);
    assert.strictEqual(startState.a, endState.a);
    assert.notStrictEqual(startState.b, endState.b);
    assert.notStrictEqual(startState.b['0'], endState.b['0']);
  });

  it('will update arrays', () => {
    const startState = {
      a: 'a',
      b: [0, null, 2],
    };
    const endState = updateIn(startState, ['b', 1], { c: 'c' });
    assert.deepEqual(endState, {
      a: 'a',
      b: [0, { c: 'c' }, 2],
    });
  });
});
