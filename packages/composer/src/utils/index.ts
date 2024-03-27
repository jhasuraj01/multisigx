import {
  type Config,
  adjectives,
  animals,
  colors,
  countries,
  languages,
  names,
  starWars
} from 'unique-names-generator'

export { v4 as uuid } from 'uuid'

export const nameGeneratorBaseConfig: Config = {
  dictionaries: [
    adjectives,
    animals,
    colors,
    countries,
    languages,
    names,
    starWars
  ]
}
