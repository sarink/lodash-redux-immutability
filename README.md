# lodash-redux-immutability
Lean (just 24 lines of code!) immutable wrappers around lodash get/set/update/delete, especially helpful for redux reducers.


## Install
```
npm install lodash-redux-immutability --save
```


## Dependencies
```
lodash.clone;
lodash.get;
lodash.isempty;
lodash.isnumber;
lodash.isstring;
lodash.setwith;
lodash.unset;
```


## Test coverage
✅ 100%


## Gotchas
When setting/updating, passing a number (ie, `3`) in your `path` will look for an array at index 3 , but passing a "string-number" (ie, `'3'`) will look for an object with a key of '3'.
<br/>
[Source](https://github.com/sarink/lodash-redux-immutability/blob/master/src/lodash-redux-immutability/lodash-redux-immutability.ts#L21)
|
[Tests](https://github.com/sarink/lodash-redux-immutability/blob/master/src/tests/updateIn-tests.ts#L87-L204)


## API
### updateIn(state:Object, path:Array<string|number>, valueToUpdate:Object)
Merges (spreads) `valueToUpdate` at `path` inside of `state` with the current value found at this path, creating any keys in path that do not exist, returning a new object where affected objects in the path have a new reference.

[Source](https://github.com/sarink/lodash-redux-immutability/blob/master/src/lodash-redux-immutability/lodash-redux-immutability.ts#L27)
|
[Tests](https://github.com/sarink/lodash-redux-immutability/blob/master/src/tests/updateIn-tests.ts)
|
Example:
```
import { updateIn } from 'lodash-redux-immutability';
const state = {
  stores: {
    '3': {
      name: 'three'
    '4': {
      name: 'four'
    }
  }
};
const storeThreeUpdates = { location: 'Third street' };
const newState = updateIn(state, ['stores', '3'], storeThreeUpdates);
newState.stores['3']; // { name: 'three', 'location: 'Third street' };
newState.stores === state.stores; // false
newState.stores['3'] === state.stores['3']; // false
newState.stores['4'] === state.stores['4']; // true
```


### setIn(state:Object, path:Array<string|number>, valueToSet:any)
Replaces `valueToSet` at `path` inside of `state`, creating any keys in path that do not exist, returning a new object where affected objects in the path have a new reference.

[Source](https://github.com/sarink/lodash-redux-immutability/blob/master/src/lodash-redux-immutability/lodash-redux-immutability.ts#L17)
|
[Tests](https://github.com/sarink/lodash-redux-immutability/blob/master/src/tests/setIn-tests.ts)
|
Example:
```
import { setIn } from 'lodash-redux-immutability';
const state = {
  stores: {
    '3': {
      name: 'three'
    }
    '4': {
      name: 'four'
    }
  }
};
const newState = setIn(state, ['stores', '3', 'name'], 'tres');
newState.stores['3']; // { name: 'tres' }
newState.stores === state.stores; // false
newState.stores['3'] === state.stores['3']; // false
newState.stores['4'] === state.stores['4']; // true
```


### deleteIn(state:Object, path:Array<string|number>)
Deletes the value at `path` inside of `state`, returning a new object where affected objects in the path have a new reference.

[Source](https://github.com/sarink/lodash-redux-immutability/blob/master/src/lodash-redux-immutability/lodash-redux-immutability.ts#L34)
|
[Tests](https://github.com/sarink/lodash-redux-immutability/blob/master/src/tests/deleteIn-tests.ts)
|
Example:
```
import { deleteIn } from 'lodash-redux-immutability';
const state = {
  '3': {
    name: 'three'
  },
  '4': {
    name: 'four'
  }
};
const newState = deleteIn(state, ['stores', '3'];
newState.stores['3']; // undefined
newState.stores === state.stores; // false
newState.stores['4'] === state.stores['4']; // true
```


### getIn(state:Object, path:Array<string|number>, defaultValue?:any)
Get a value from an object by path. Returns the value, unless path is an empty [], in which case returns the original object

[Source](https://github.com/sarink/lodash-redux-immutability/blob/master/src/lodash-redux-immutability/lodash-redux-immutability.ts#L13)
|
[Tests](https://github.com/sarink/lodash-redux-immutability/blob/master/src/tests/getIn-tests.ts)
|
Example:
```
import { getIn } from 'lodash-redux-immutability';
const state = {
  stores: {
    '3': {
      name: 'three'
    }
  }
};
const storeThreeName = getIn(state, ['stores', '3', 'name']); // 'three'
const entireState = getIn(state, []); // the entire 'state' object (this is what makes `getIn` different from the traditional `_.get`)
```

## License
MIT
