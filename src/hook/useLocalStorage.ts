import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type IUseLocalStorage =
   string |
   Dispatch<SetStateAction<string>>

export function useLocalStorage (key: string, initialValue: string): IUseLocalStorage[] {
  const [state, setState] = useState(initialValue)

  useEffect(() => {
    const storageValue = localStorage.get(key)

    if (!storageValue) {
      setState(initialValue)
    } else {
      setState(JSON.parse(storageValue))
    }
  }, [])

  useEffect(() => {
    localStorage.set(key, JSON.stringify(initialValue))
  }, [state, key, initialValue])

  return [state, setState]
}
