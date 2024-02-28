import {
  AndRule,
  AtleastRule,
  BaseRule,
  InternalLogicRule,
  LogicRule,
  OrRule,
  RuleID,
  SignRule
} from '@jhasuraj01/interface'
import {
  Config,
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

type BaseRuleParams = {
  name?: BaseRule['name']
  dependsOn?: RuleID[]
  dependents?: RuleID[]
}

function generate_rule_base(_params?: BaseRuleParams): BaseRule {
  return {
    id: uuid(),
    name: _params?.name ?? uniqueNamesGenerator(nameGeneratorConfig),
    dependsOn: new Set(_params?.dependsOn ?? []),
    dependents: new Set(_params?.dependents ?? [])
  }
}

export function convert_internal_logic(logic: LogicRule): InternalLogicRule {
  // Destructure the logic object to exclude dependsOn and dependents properties
  const { dependsOn, dependents, ...internalLogic } = logic
  return internalLogic
}

export type OrRuleParams = BaseRuleParams
export function generate_rule_or(_params?: OrRuleParams): OrRule {
  return {
    ...generate_rule_base(_params),
    type: 'OR'
  }
}

export type AndRuleParams = BaseRuleParams
export function generate_rule_and(_params?: AndRuleParams): AndRule {
  return {
    ...generate_rule_base(_params),
    type: 'AND'
  }
}

export type AtleastRuleParams = BaseRuleParams & {
  count?: number
}
export function generate_rule_atleast(
  _params?: AtleastRuleParams
): AtleastRule {
  return {
    ...generate_rule_base(_params),
    type: 'ATLEAST',
    count: _params?.count ?? 1
  }
}

export type SignRuleParams = BaseRuleParams & {
  address: SignRule['address']
  internalLogic: SignRule['internalLogic']
}
export function generate_sign_rule(_params: SignRuleParams): SignRule {
  return {
    ...generate_rule_base(_params),
    type: 'SIGN',
    address: _params.address,
    internalLogic:
      _params.internalLogic ?? convert_internal_logic(generate_rule_and())
  }
}