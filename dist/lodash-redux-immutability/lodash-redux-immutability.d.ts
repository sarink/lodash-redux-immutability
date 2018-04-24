export interface IGenericObject extends Object {
    [key: string]: any;
}
export interface IPath extends Array<string | number> {
}
export declare const getIn: (state: IGenericObject, path: IPath, defaultValue?: any) => any;
export declare const setIn: (state: IGenericObject, path: IPath, valueToSet: any) => any;
export declare const updateIn: (state: IGenericObject, path: IPath, valueToSet: IGenericObject) => any;
export declare const deleteIn: (state: IGenericObject, path: IPath) => any;
