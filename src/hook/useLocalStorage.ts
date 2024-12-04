/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

type IUseLocalStorage = any | ((value: any) => void);

export function useLocalStorage(
  key: string,
  initialValue: any
): IUseLocalStorage[] {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  function setValue(newValue: any): void {
    setState(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  return [state, setValue];
}
