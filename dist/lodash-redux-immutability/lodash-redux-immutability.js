var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import _clone from 'lodash.clone';
import _get from 'lodash.get';
import _isEmpty from 'lodash.isempty';
import _isNumber from 'lodash.isnumber';
import _isString from 'lodash.isstring';
import _setWith from 'lodash.setwith';
import _unset from 'lodash.unset';
export var getIn = function (state, path, defaultValue) {
    return _isEmpty(path) ? state : _get(state, path, defaultValue);
};
export var setIn = function (state, path, valueToSet) {
    if (_isEmpty(path))
        return valueToSet;
    return _setWith(__assign({}, state), path, valueToSet, function (nsValue, key, nsObject) {
        var nextKey = path[path.lastIndexOf(key) + 1];
        var isStringNumber = _isString(nextKey) && _isNumber(parseInt(nextKey, 10));
        var result = isStringNumber ? Object(nsValue) : nsValue;
        return _clone(result);
    });
};
export var updateIn = function (state, path, valueToSet) {
    if (_isEmpty(path))
        return __assign({}, state, valueToSet);
    var origValue = _get(state, path);
    var updatedValue = __assign({}, origValue, valueToSet);
    return setIn(state, path, updatedValue);
};
export var deleteIn = function (state, path) {
    if (_isEmpty(path))
        return {};
    var valueAtPath = _get(state, path);
    var stateWithClonedPath = _setWith(__assign({}, state), path, valueAtPath, _clone);
    _unset(stateWithClonedPath, path);
    return stateWithClonedPath;
};
