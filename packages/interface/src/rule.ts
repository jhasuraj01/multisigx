import type { Except } from 'type-fest'
import { z } from 'zod'
import { y } from 'zod.discriminatedunion'

export type EthereumAddress = string
export const EthereumAddressSchema: z.ZodType<EthereumAddress> = z.string()

export type RuleID = string
export const RuleIDSchema: z.ZodType<RuleID> = z.string()

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

  /** set of rules which depends on this rule */
  dependents: Set<RuleID>
}
export const BaseRuleSchema = z.object({
  id: RuleIDSchema,
  name: z.string(),
  dependsOn: z.set(RuleIDSchema),
  dependents: z.set(RuleIDSchema)
})

/**
 * ### Start Rule
 * A node from where the graph starts
 */
export type StartRule = Except<BaseRule, 'dependsOn'> & {
  type: 'START'
}
export const StartRuleSchema = BaseRuleSchema.omit({
  dependsOn: true
}).extend({
  type: z.literal('START')
})

/**
 * ### And Rule
 * A rule that requires all of its subrules to be satisfied
 */
export type AndRule = BaseRule & {
  type: 'AND'
}
export const AndRuleSchema = BaseRuleSchema.extend({
  type: z.literal('AND')
})

/**
 * ### OR Rule
 * A rule that requires at least one of its subrules to be satisfied
 */
export type OrRule = BaseRule & {
  type: 'OR'
}
export const OrRuleSchema = BaseRuleSchema.extend({
  type: z.literal('OR')
})

/**
 * ### Atleast Rule
 * A rule that requires at least a certain number of its subrules to be satisfied
 */
export type AtleastRule = BaseRule & {
  type: 'ATLEAST'

  /** The minimum number of subrules that must be satisfied */
  count: number
}
export const AtleastRuleSchema = BaseRuleSchema.extend({
  type: z.literal('ATLEAST'),
  count: z.number().min(1).max(Number.MAX_SAFE_INTEGER)
})

export type LogicRule = AndRule | OrRule | AtleastRule
export const LogicRuleSchema = y.discriminatedUnion('type', [
  AndRuleSchema,
  OrRuleSchema,
  AtleastRuleSchema
])

export type InternalLogicRule = Except<
  LogicRule,
  'dependsOn' | 'dependents' | 'name' | 'id'
>
export const InternalLogicRuleSchema = LogicRuleSchema.omit({
  id: true,
  name: true,
  dependents: true,
  dependsOn: true
})

/**
 * ### Sign Rule
 * A rule that requires a signature from a specific Ethereum address
 */
export type SignRule = BaseRule & {
  type: 'SIGN'

  internalLogic: InternalLogicRule

  /** The Ethereum address associated with the sign rule. */
  address: EthereumAddress
}
export const SignRuleSchema = BaseRuleSchema.extend({
  type: z.literal('SIGN'),
  internalLogic: InternalLogicRuleSchema,
  address: EthereumAddressSchema
})

/**
 * ### End Rule
 * The final node of the graph
 */
export type EndRule = Except<BaseRule, 'dependents'> & {
  type: 'END'
  internalLogic: InternalLogicRule
}
export const EndRuleSchema = BaseRuleSchema.omit({
  dependents: true
}).extend({
  type: z.literal('END'),
  internalLogic: InternalLogicRuleSchema
})

export type Rule = StartRule | LogicRule | SignRule | EndRule
export const RuleSchema = y.discriminatedUnion('type', [
  StartRuleSchema,
  LogicRuleSchema,
  SignRuleSchema,
  EndRuleSchema
])
