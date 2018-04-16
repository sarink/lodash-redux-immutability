import _clone from 'lodash.clone';
import _get from 'lodash.get';
import _isEmpty from 'lodash.isempty';
import _isNumber from 'lodash.isnumber';
import _isString from 'lodash.isstring';
import _setWith from 'lodash.setwith';
import _unset from 'lodash.unset';


export interface IGenericObject extends Object { [key:string]: any; }
export interface IPath extends Array<string|number> {}

export const getIn = (state:IGenericObject, path:IPath, defaultValue?:any) : any => {
  return _isEmpty(path) ? state : _get(state, path, defaultValue);
};

export const setIn = (state:IGenericObject, path:IPath, valueToSet:any) : any => {
  if (_isEmpty(path)) return valueToSet;
  return _setWith({ ...state }, path, valueToSet, (nsValue, key, nsObject) => {
    const nextKey = path[path.lastIndexOf(key) + 1];
    const isStringNumber = _isString(nextKey) && _isNumber(parseInt((nextKey as string), 10));
    const result = isStringNumber ? Object(nsValue) : nsValue;
    return _clone(result);
  });
};

export const updateIn = (state:IGenericObject, path:IPath, valueToSet:IGenericObject) : any => {
  if (_isEmpty(path)) return { ...state, ...valueToSet };
  const origValue = _get(state, path);
  const updatedValue = { ...origValue, ...valueToSet };
  return setIn(state, path, updatedValue);
};

export const deleteIn = (state:IGenericObject, path:IPath) : any => {
  if (_isEmpty(path)) return {};
  const valueAtPath = _get(state, path);
  const stateWithClonedPath = _setWith({ ...state }, path, valueAtPath, _clone);
  _unset(stateWithClonedPath, path);
  return stateWithClonedPath;
};
