import {
  type BaseRule,
  type BaseRuleSchema,
  type OrRuleSchema,
  type OrRule,
  type AndRuleSchema,
  type AndRule,
  type AtleastRule,
  type AtleastRuleSchema,
  type StartRule,
  type StartRuleSchema,
  type LogicRule,
  type LogicRuleSchema,
  type InternalLogicRule,
  type InternalLogicRuleSchema,
  type SignRule,
  type SignRuleSchema,
  type EndRule,
  type EndRuleSchema,
  type RuleSchema,
  type Rule,
  type EthereumAddressSchema,
  type RuleIDSchema,
  type RuleID,
  type EthereumAddress
} from '../src'
import { describe, expectTypeOf, test } from 'vitest'
import { type IsEqual, type Simplify } from 'type-fest'

describe('storage Tests', () => {
  test('typecheck EthereumAddressSchema', () => {
    expectTypeOf<
      IsEqual<
        Simplify<EthereumAddress>,
        ReturnType<typeof EthereumAddressSchema.parse>
      >
    >().toEqualTypeOf<true>()
  })

  test('typecheck RuleIDSchema', () => {
    expectTypeOf<
      IsEqual<Simplify<RuleID>, ReturnType<typeof RuleIDSchema.parse>>
    >().toEqualTypeOf<true>()
  })

  test('typecheck BaseRuleSchema', () => {
    expectTypeOf<
      IsEqual<Simplify<BaseRule>, ReturnType<typeof BaseRuleSchema.parse>>
    >().toEqualTypeOf<true>()
  })

  test('typecheck StartRuleSchema', () => {
    expectTypeOf<
      IsEqual<Simplify<StartRule>, ReturnType<typeof StartRuleSchema.parse>>
    >().toEqualTypeOf<true>()
  })

  test('typecheck AndRuleSchema', () => {
    expectTypeOf<
      IsEqual<Simplify<AndRule>, ReturnType<typeof AndRuleSchema.parse>>
    >().toEqualTypeOf<true>()
  })

  test('typecheck OrRuleSchema', () => {
    expectTypeOf<
      IsEqual<Simplify<OrRule>, ReturnType<typeof OrRuleSchema.parse>>
    >().toEqualTypeOf<true>()
  })

  test('typecheck AtleastRuleSchema', () => {
    expectTypeOf<
      IsEqual<Simplify<AtleastRule>, ReturnType<typeof AtleastRuleSchema.parse>>
    >().toEqualTypeOf<true>()
  })

  test('typecheck LogicRuleSchema', () => {
    expectTypeOf<
      IsEqual<Simplify<LogicRule>, ReturnType<typeof LogicRuleSchema.parse>>
    >().toEqualTypeOf<true>()
  })

  test('typecheck InternalLogicRuleSchema', () => {
    expectTypeOf<
      IsEqual<
        Simplify<InternalLogicRule>,
        ReturnType<typeof InternalLogicRuleSchema.parse>
      >
    >().toEqualTypeOf<true>()
  })

  test('typecheck SignRuleSchema', () => {
    expectTypeOf<
      IsEqual<Simplify<SignRule>, ReturnType<typeof SignRuleSchema.parse>>
    >().toEqualTypeOf<true>()
  })

  test('typecheck EndRuleSchema', () => {
    expectTypeOf<
      IsEqual<Simplify<EndRule>, ReturnType<typeof EndRuleSchema.parse>>
    >().toEqualTypeOf<true>()
  })

  test('typecheck RuleSchema', () => {
    expectTypeOf<
      IsEqual<Simplify<Rule>, ReturnType<typeof RuleSchema.parse>>
    >().toEqualTypeOf<true>()
  })
})
