import { OneFiInfo } from "../../types/one.json";
import { createTypeSafeStorage } from "./Storage";
import { usePersistenceState } from "../../utils/hooks/usePersistenceState";

/**
 * @example
 * const ssids: string [] = await OneFiStorage.getItem('ssids');
 */
export const OneFiStorage = createTypeSafeStorage<OneFiInfo>();

export const useOnFiStorage = <K extends keyof OneFiInfo>(key: K) => {
  return usePersistenceState<OneFiInfo, K>(OneFiStorage, key);
};
