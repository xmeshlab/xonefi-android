// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {  isNil } from '../../utils/util';
//
//
// export class Storage<T> {
//     protected cache: Partial<T> | null;
//     constructor(private storageName: string) {
//     }
//     async isEmpty () {
//         const s = await AsyncStorage.getItem(this.storageName);
//         if (s != null ) {
//             this.cache = JSON.parse(s);
//         }
//         return s !== null;
//     }
//     async init (data: Partial<T> ) {
//         await AsyncStorage.setItem(this.storageName, JSON.stringify(data));
//         this.cache = data;
//     }
//     async getAll(): Promise<Readonly<Partial<T>>> {
//         if (isNil(this.cache)) {
//             const str = await AsyncStorage.getItem(this.storageName)
//             if (str) {
//                 this.cache = JSON.parse(str);
//             }
//         }
//         return this.cache;
//     }
//
//     async clear(): Promise<void> {
//         await AsyncStorage.removeItem(this.storageName);
//         this.cache = null;
//     }
//     async getItem<K extends keyof T>(key: K): Promise<T[K] | null> {
//         let cacheValue = this.cache[key];
//         if (isNil(cacheValue)) {
//             await this.readAndParse();
//             cacheValue = this.cache[key];
//
//         }
//         return cacheValue;
//     }
//
//     async merge(value: Partial<T>): Promise<void> {
//         await AsyncStorage.mergeItem(this.storageName, JSON.stringify(value));
//         this.cache = Object.assign({}, this.cache, value);
//     }
//
//     async removeItem(key: string): Promise<void> {
//         delete this.cache?.[key];
//         await this.merge(this.cache);
//         return Promise.resolve(undefined);
//     }
//
//     async setItem<K extends keyof T>(key: K, value: T[K]): Promise<void> {
//         this.cache[key] = value;
//         await this.merge(this.cache);
//     }
//
//
//     private async readAndParse() {
//         this.cache = JSON.parse(await AsyncStorage.getItem(this.storageName));
//         return this.cache;
//     }
//
// }
//
//
//

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Callback,
  CallbackWithResult,
  MultiCallback,
  MultiGetCallback,
} from "@react-native-async-storage/async-storage/lib/typescript/types";
import { onefiSimpleData } from "./oneFiSimpleData";

function isPrimitive(val: any) {
  if (typeof val === "object") {
    return val === null;
  }
  return typeof val !== "function";
}

export const createTypeSafeStorage = <T extends {}>() => {
  type Key = keyof T;
  return {
    async isEmpty() {
      const tasks = await Promise.all(
        Object.keys(onefiSimpleData).map((key) =>
          AsyncStorage.getItem(key).then((res) => ({
            key,
            value: JSON.parse(res),
          }))
        )
      );
      const data: T = tasks.reduce((prev, next) => {
        prev[next.key] = next.value;
        return prev;
      }, {} as T);
      return Object.keys(data).length === 0;
    },
    async init(data: Partial<T>) {
      await Promise.all(
        Object.keys(data).map((key) =>
          AsyncStorage.setItem(key, JSON.stringify(data[key]))
        )
      );
    },
    clear(callback?: Callback): Promise<void> {
      return AsyncStorage.clear(callback);
    },
    flushGetRequests(): void {
      return AsyncStorage.flushGetRequests();
    },
    async getAllKeys(
      callback?: CallbackWithResult<readonly string[]> | undefined
    ): Promise<readonly Key[]> {
      return (await AsyncStorage.getAllKeys(callback)) as Key[];
    },
    mergeItem<K extends Key>(
      key: K,
      value: T[K],
      callback?: Callback | undefined
    ): Promise<void> {
      // return AsyncStorage.mergeItem(key as string, JSON.stringify(value), callback);
      const val = JSON.stringify(value);
      // @ts-ignore
      return AsyncStorage.mergeItem(key as string, val, callback);
    },
    async multiGet<K extends Key>(
      keys: readonly K[],
      callback?: MultiGetCallback
    ): Promise<[K, T[Key]][]> {
      return (
        await AsyncStorage.multiGet(keys as unknown as string[], callback)
      ).map(([key, value]) => {
        return [key as unknown as K, JSON.parse(value) as T[K]];
      });
    },
    multiMerge<K extends Key>(
      keyValuePairs: [K, T[K]][],
      callback?: MultiCallback
    ): Promise<void> {
      const newKeyValuePairs: [string, string][] = keyValuePairs.map(
        ([key, value]) => {
          return [key as string, JSON.stringify(value)];
        }
      );
      return AsyncStorage.multiMerge(newKeyValuePairs, callback);
    },
    multiRemove(keys: readonly Key[], callback?: MultiCallback): Promise<void> {
      return AsyncStorage.multiRemove(keys as unknown as string[], callback);
    },
    multiSet<K extends Key>(
      keyValuePairs: [K, T[K]][],
      callback?: MultiCallback
    ): Promise<void> {
      const newKeyValuePairs: [string, string][] = keyValuePairs.map(
        ([key, value]) => {
          return [key as string, JSON.stringify(value)];
        }
      );
      return AsyncStorage.multiSet(newKeyValuePairs, callback);
    },
    removeItem(key: Key, callback?: Callback): Promise<void> {
      return AsyncStorage.removeItem(key as string, callback);
    },
    setItem<K extends Key>(
      key: K,
      value: T[K],
      callback?: Callback
    ): Promise<void> {
      const val = JSON.stringify(value);
      return AsyncStorage.setItem(key as string, val as string, callback);
    },
    async getItem<K extends Key>(key: K, callback?): Promise<T[K] | null> {
      console.log("start getItem");
      const text = await AsyncStorage.getItem(
        key as unknown as string,
        callback
      );
      console.log("getItem", key, text);
      return JSON.parse(text);
    },
  } as const;
};
