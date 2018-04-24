// import { assert } from 'chai';
//
// import { mergeDeep } from 'src/lodash-redux-immutability/lodash-redux-immutability';
//
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
