import { themeTypePokemon } from './theme'
export function chooseBackgroundByTypePokemon (typePokemon: string): string {
  let backgroundColor = themeTypePokemon[typePokemon]
  if (!backgroundColor) {
    backgroundColor = '#797979'
  }

  return backgroundColor
}
