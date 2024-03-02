import {
  type EndRule,
  type AndRule,
  type AtleastRule,
  type BaseRule,
  type OrRule,
  type RuleID,
  type SignRule,
  type StartRule
} from '@jhasuraj01/interface'
import {
  type Config,
  adjectives,
  animals,
  colors,
  countries,
  languages,
  names,
  starWars,
  uniqueNamesGenerator
} from 'unique-names-generator'
import { v4 as uuid } from 'uuid'

const nameGeneratorConfig: Config = {
  dictionaries: [
    adjectives,
    animals,
    colors,
    countries,
    languages,
    names,
    starWars
  ],
  separator: '-',
  length: 2
}

interface BaseRuleParams {
  name?: BaseRule['name']
  dependsOn?: RuleID[]
  dependents?: RuleID[]
}

function generateBaseRule(_params?: BaseRuleParams): BaseRule {
  return {
    id: uuid(),
    name: _params?.name ?? uniqueNamesGenerator(nameGeneratorConfig),
    dependsOn: new Set(_params?.dependsOn ?? []),
    dependents: new Set(_params?.dependents ?? [])
  }
}

export type StartRuleParams = BaseRuleParams
export function generateStartRule(_params?: StartRuleParams): StartRule {
  const { dependsOn, ...baseRule } = generateBaseRule(_params)
  return {
    ...baseRule,
    type: 'START'
  }
}

export type OrRuleParams = BaseRuleParams
export function generateOrRule(_params?: OrRuleParams): OrRule {
  return {
    ...generateBaseRule(_params),
    type: 'OR'
  }
}

export type AndRuleParams = BaseRuleParams
export function generateAndRule(_params?: AndRuleParams): AndRule {
  return {
    ...generateBaseRule(_params),
    type: 'AND'
  }
}

export type AtleastRuleParams = BaseRuleParams & {
  count?: number
}
export function generateAtleastRule(_params?: AtleastRuleParams): AtleastRule {
  return {
    ...generateBaseRule(_params),
    type: 'ATLEAST',
    count: _params?.count ?? 1
  }
}

export type SignRuleParams = BaseRuleParams & {
  address: SignRule['address']
  internalLogic?: SignRule['internalLogic']
}
export function generateSignRule(_params: SignRuleParams): SignRule {
  return {
    ...generateBaseRule(_params),
    type: 'SIGN',
    address: _params.address,
    internalLogic: _params.internalLogic ?? generateAndRule()
  }
}

export type EndRuleParams = BaseRuleParams & {
  internalLogic?: EndRule['internalLogic']
}
export function generateEndRule(_params: EndRuleParams): EndRule {
  const { dependents, ...baseRule } = generateBaseRule(_params)
  return {
    ...baseRule,
    type: 'END',
    internalLogic: _params.internalLogic ?? generateAndRule()
  }
}
