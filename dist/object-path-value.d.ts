declare type Obj = any[] | object | null | undefined | string | number | symbol;
declare type Path = string | number | undefined | null | (string | number)[];
export declare const getValue: (obj: Obj, path: Path, defaultValue?: any) => any;
export default getValue;
