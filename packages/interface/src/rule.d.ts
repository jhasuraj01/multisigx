export type EthereumAddress = string
export type RuleID = string

/**
 * ### Base Rule
 * The base rule that all rules extend from
 */
export interface BaseRule {
  /** unique identifier for the rule */
  id: RuleID

  /** unique human readable name of the rule */
  name: string

  /** set of rules this rule is dependent on */
  dependsOn: Set<RuleID>
}

/**
 * ### Sign Rule
 * A rule that requires a signature from a specific Ethereum address
 */
export type SignRule = BaseRule & {
  type: 'SIGN'

  /** The Ethereum address associated with the sign rule. */
  address: EthereumAddress
}

/**
 * ### And Rule
 * A rule that requires all of its subrules to be satisfied
 */
export type AndRule = BaseRule & {
  type: 'AND'
}

/**
 * ### OR Rule
 * A rule that requires at least one of its subrules to be satisfied
 */
export type ORRule = BaseRule & {
  type: 'OR'
}

/**
 * ### Atleast Rule
 * A rule that requires at least a certain number of its subrules to be satisfied
 */
export type AtleastRule = BaseRule & {
  type: 'ATLEAST'

  /** The minimum number of subrules that must be satisfied */
  count: number
}

export type Rule = AndRule
