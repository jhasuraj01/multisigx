import {
  AndRuleSchema,
  AtleastRuleSchema,
  BaseRuleSchema,
  EndRuleSchema,
  InternalLogicRuleSchema,
  OrRuleSchema,
  SignRuleSchema,
  StartRuleSchema,
  type AndRule,
  type AtleastRule,
  type BaseRule,
  type EndRule,
  type OrRule,
  type SignRule,
  type StartRule,
} from '@jhasuraj01/interface'
import { type Except } from 'type-fest'
import { uniqueNamesGenerator } from 'unique-names-generator'
import { nameGeneratorBaseConfig, uuid } from './utils'

const ruleNameGeneratorConfig = {
  ...nameGeneratorBaseConfig,
  separator: ' ',
  length: 3
}

interface BaseRuleParams {
  id?: BaseRule['id']
  name?: BaseRule['name']
  dependsOn?: BaseRule['dependsOn']
  dependents?: BaseRule['dependents']
}

function generateBaseRule(_params?: BaseRuleParams): BaseRule {
  return BaseRuleSchema.parse({
    id: _params?.id ?? uuid(),
    name: _params?.name ?? uniqueNamesGenerator(ruleNameGeneratorConfig),
    dependsOn: new Set(_params?.dependsOn ?? []),
    dependents: new Set(_params?.dependents ?? [])
  })
}

export type StartRuleParams = Except<BaseRuleParams, 'dependsOn'>
export function generateStartRule(_params?: StartRuleParams): StartRule {
  return StartRuleSchema.parse({
    ...generateBaseRule(_params),
    type: 'START'
  })
}

export type OrRuleParams = BaseRuleParams
export function generateOrRule(_params?: OrRuleParams): OrRule {
  return OrRuleSchema.parse({
    ...generateBaseRule(_params),
    type: 'OR'
  })
}

export type AndRuleParams = BaseRuleParams
export function generateAndRule(_params?: AndRuleParams): AndRule {
  return AndRuleSchema.parse({
    ...generateBaseRule(_params),
    type: 'AND'
  })
}

export type AtleastRuleParams = BaseRuleParams & {
  count?: number
}
export function generateAtleastRule(_params?: AtleastRuleParams): AtleastRule {
  return AtleastRuleSchema.parse({
    ...generateBaseRule(_params),
    type: 'ATLEAST',
    count: _params?.count ?? 1
  })
}

export type SignRuleParams = BaseRuleParams & {
  address: SignRule['address']
  internalLogic?: SignRule['internalLogic']
}
export function generateSignRule(_params: SignRuleParams): SignRule {
  return SignRuleSchema.parse({
    ...generateBaseRule(_params),
    type: 'SIGN',
    address: _params.address,
    internalLogic: InternalLogicRuleSchema.parse(_params?.internalLogic ?? generateAndRule())
  })
}

export type EndRuleParams = Except<BaseRuleParams, 'dependents'> & {
  internalLogic?: EndRule['internalLogic']
}
export function generateEndRule(_params?: EndRuleParams): EndRule {
  return EndRuleSchema.parse({
    ...generateBaseRule(_params),
    type: 'END',
    internalLogic: InternalLogicRuleSchema.parse(_params?.internalLogic ?? generateAndRule())
  })
}
