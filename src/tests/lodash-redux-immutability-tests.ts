import { assert } from 'chai';

import { getIn, deleteIn, setIn, updateIn } from 'src/lodash-redux-immutability/lodash-redux-immutability';


describe('reducerHelpers', () => {
  describe('getIn', () => {
    it('returns the object if the path is empty', () => {
      const state = { a: 1, b: 2 };
      const result = getIn(state, []);
      assert.strictEqual(state, result);
    });
  });
  
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

  // describe('mergeDeep', () => {
  //   it('will perform immutable deep merge', () => {
  //     const startState = {
  //       a: [
  //         { ab: 'ab' },
  //         { ad: 'ad' },
  //       ],
  //       b: [
  //         { ba: 'ba' },
  //       ],
  //     };
  //     const objectToMerge = {
  //       a: [
  //         { ac: 'ac' },
  //         { ae: 'ae' },
  //       ],
  //     };
  //     const endState = mergeDeep(startState, objectToMerge);
  //     console.log('start', startState);
  //     console.log('end', endState);
  //     assert.deepEqual(endState, {
  //       a: [
  //         { ab: 'ab', ac: 'ac' },
  //         { ad: 'ad', ae: 'ae' },
  //       ],
  //       b: [
  //         { ba: 'ba' },
  //       ],
  //     });
  //     assert.notStrictEqual(startState.a, endState.a, 'notStrict 1');
  //     assert.notStrictEqual(startState.a[0], endState.a[0], 'notStrict 2');
  //     assert.notStrictEqual(startState.a[1], endState.a[1], 'notStrict 3');
  //     assert.strictEqual(startState.b, endState.b, 'strict 1');
  //     assert.strictEqual(startState.b[0], endState.b[0], 'strict 2');
  //   });
  // });
});
