import { localStorageWrapper } from '@/storage/storage';
import { SetStateAction, useCallback, useState } from 'react';
import { useLatest } from './use-latest';

type AnyFunction = (...args: any[]) => any;

function isFunction(val: unknown): val is AnyFunction {
  return typeof val === 'function';
}

export function useLocalStorageState<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState(() => {
    const savedValue = localStorageWrapper.get<T>(key);

    if (typeof savedValue !== 'undefined') {
      return savedValue;
    }

    return isFunction(initialValue) ? initialValue() : initialValue;
  });

  const latestValue = useLatest(value);

  const updateValue = useCallback(
    (newValue: SetStateAction<T>) => {
      setValue(newValue);

      const actualValue = isFunction(newValue) ? newValue(latestValue.current) : newValue;

      localStorageWrapper.set(key, actualValue);
    },
    [key, latestValue],
  );

  return [value, updateValue] as const;
}
