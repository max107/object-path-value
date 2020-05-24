type AnyObj = { [key: string]: any };
type AnyArray = any[];
type Obj = AnyArray | AnyObj | null | string | number | undefined;
type Path = undefined | string | number | null | AnyArray;

const isObject = (obj: Obj): boolean => typeof obj === 'object';
const isArray = (obj: Obj): boolean => Array.isArray(obj);
const getFromArray = (obj: AnyArray, prop: number): Obj | void => obj[prop];
const getFromObject = (obj: AnyObj, prop: string): Obj | void => obj[prop];
const isValid = (obj: Obj): boolean => isObject(obj) || isArray(obj);

const getProperty = (obj: Obj, prop?: Path): any => {
  if (isArray(obj)) {
    return getFromArray(obj as AnyArray, prop as number);
  }

  return getFromObject(obj as AnyObj, prop as string);
}

export const getValue = (obj: Obj, path: Path, defaultValue?: any): any => {
  if (!isValid(obj)) {
    return obj;
  }

  if (!path || null === obj) {
    return defaultValue;
  }

  if (typeof path === 'number') {
    path = [path];
  }

  if (typeof path === 'string') {
    if (typeof obj === 'object' && path in obj) {
      return getFromObject(obj, path);
    }

    return getValue(obj, path.split('.'), defaultValue);
  }

  const [firstKey, ...rest] = [...path];
  const nextObj = getProperty(obj, firstKey);

  if (nextObj === void 0) {
    return defaultValue;
  }

  if (isValid(nextObj)) {
    return getValue(nextObj, rest, defaultValue);
  }

  return nextObj;
}

export default getValue;
