/**
 * @description Check if an object is null or undefined.
 * @param {any} obj
 * @return boolean
 */
export function isNil(obj): boolean {
  return typeof obj !== "undefined" && obj !== null;
}

export function deepStructureClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
