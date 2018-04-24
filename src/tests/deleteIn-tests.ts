import { assert } from 'chai';

import { deleteIn } from 'src/lodash-redux-immutability/lodash-redux-immutability';


describe('deleteIn', () => {
  it('can delete keys from object', () => {
    const startState = {
      a: 1,
      b: {
        ba: 2,
        bb: 3,
      },
    };
    const endState = deleteIn(startState, ['b', 'ba']);
    assert.deepEqual(endState, {
      a: 1,
      b: {
        bb: 3,
      },
    });
  });

  it('will delete all keys from an object if path is empty', () => {
    const startState = {
      a: {
        aa: 1,
      },
      b: {
        ba: 2,
      },
    };
    const endState = deleteIn(startState, []);
    assert.deepEqual(endState, {});
  });

  it('can delete keys from object without mutating', () => {
    const startState = {
      a: {
        aa: 1,
      },
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
      c: {
        ca: 7,
      },
    };
    const endState = deleteIn(startState, ['b', 'bc', 'bca']);
    assert.deepEqual(endState, {
      a: {
        aa: 1,
      },
      b: {
        ba: 2,
        bb: 3,
        bc: {
          bcb: 5,
        },
        bd: {
          bda: 6,
        },
      },
      c: {
        ca: 7,
      },
    });
    assert.strictEqual(startState.a, endState.a);
    assert.strictEqual(startState.a.aa, endState.a.aa);
    assert.notStrictEqual(startState.b, endState.b);
    assert.notStrictEqual(startState.b.bc, endState.b.bc);
    assert.strictEqual(startState.b.bc.bcb, endState.b.bc.bcb);
    assert.strictEqual(startState.b.bd, endState.b.bd);
    assert.strictEqual(startState.b.bd.bda, endState.b.bd.bda);
    assert.strictEqual(startState.c, endState.c);
    assert.strictEqual(startState.c.ca, endState.c.ca);
  });

  it('can delete keys from object with arrays without mutating', () => {
    const startState = {
      a: {
        aa: 1,
      },
      b: {
        ba: 2,
        bb: 3,
        bc: [
          { bca: 4 },
          { bcb: 4 },
        ],
        bd: {
          bda: 6,
        },
      },
      c: {
        ca: 7,
      },
    };
    const endState = deleteIn(startState, ['b', 'bc', 1, 'bcb']);
    assert.deepEqual(endState, {
      a: {
        aa: 1,
      },
      b: {
        ba: 2,
        bb: 3,
        bc: [
          { bca: 4 },
          {},
        ],
        bd: {
          bda: 6,
        },
      },
      c: {
        ca: 7,
      },
    });
    assert.strictEqual(startState.a, endState.a);
    assert.strictEqual(startState.a.aa, endState.a.aa);
    assert.notStrictEqual(startState.b, endState.b);
    assert.notStrictEqual(startState.b.bc, endState.b.bc);
    assert.strictEqual(startState.b.bc[0], endState.b.bc[0]);
    assert.notStrictEqual(startState.b.bc[1], endState.b.bc[1]);
    assert.strictEqual(startState.b.bd, endState.b.bd);
    assert.strictEqual(startState.b.bd.bda, endState.b.bd.bda);
    assert.strictEqual(startState.c, endState.c);
    assert.strictEqual(startState.c.ca, endState.c.ca);
  });
});
