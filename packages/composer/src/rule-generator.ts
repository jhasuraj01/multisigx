import {
  type EndRule,
  type AndRule,
  type AtleastRule,
  type BaseRule,
  type OrRule,
  type SignRule,
  type StartRule
} from '@jhasuraj01/interface'
import { uniqueNamesGenerator } from 'unique-names-generator'
import { nameGeneratorBaseConfig, uuid } from './utils'
import { type Except } from 'type-fest'

const ruleNameGeneratorConfig = {
  ...nameGeneratorBaseConfig,
  separator: ' ',
  length: 3
}

interface BaseRuleParams {
  name?: BaseRule['name']
  dependsOn?: BaseRule['dependsOn']
  dependents?: BaseRule['dependents']
}

function generateBaseRule(_params?: BaseRuleParams): BaseRule {
  return {
    id: uuid(),
    name: _params?.name ?? uniqueNamesGenerator(ruleNameGeneratorConfig),
    dependsOn: new Set(_params?.dependsOn ?? []),
    dependents: new Set(_params?.dependents ?? [])
  }
}

export type StartRuleParams = Except<BaseRuleParams, 'dependsOn'>
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

export type EndRuleParams = Except<BaseRuleParams, 'dependents'> & {
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
