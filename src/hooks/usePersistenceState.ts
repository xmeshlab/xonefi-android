import { useCallback, useEffect, useState } from "react";
//import { Storage } from "../../api/storage/Storage";

export const usePersistenceState = <T, K extends keyof T>(
  storage: Storage<T>,
  key: K
) => {
  const [state, setState] = useState<T[K]>(undefined);
  useEffect(() => {
    storage.getItem(key).then((value) => setState(value));
  }, []);
  // const setItem = useCallback(async (value: T[K]) => {
  //     await storage.setItem(key, value);
  //     setState(value);
  // }, [setState]);

  const setItem = useCallback(
    async function (value: T[K]) {
      await storage.setItem(key, value);
      setState(value);
    },
    [setState]
  );

  return [state, setItem] as const;
};
