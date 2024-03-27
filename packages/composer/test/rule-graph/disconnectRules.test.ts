import { Rule } from '@jhasuraj01/interface'
import { RuleGraph } from 'src'
import { assert, beforeEach, describe, expect, test } from 'vitest'

const graphObject: object = {
  id: 'rule-graph',
  title: 'Rule Graph',
  description: 'Test Rule Graph',
  identifier: 'multisigx-rule_graph_object',
  version: 1,
  rules: new Map([
    ['start', {
      id: 'start',
      name: 'Start Rule',
      dependents: new Set(['sign']),
      type: 'START'
    }],
    ['sign', {
      id: 'sign',
      address: 'director',
      name: 'Sign Rule',
      dependsOn: new Set(['start']),
      dependents: new Set(['end']),
      type: 'SIGN',
      internalLogic: {
        type: 'AND'
      }
    }],
    ['end', {
      id: 'end',
      name: 'End Rule',
      type: 'END',
      dependsOn: new Set(['sign']),
      internalLogic: {
        type: 'AND'
      }
    }]
  ]),
}

describe('RuleGraph.disconnectRules tests', () => {
  let ruleGraph: RuleGraph

  beforeEach(() => {
    ruleGraph = RuleGraph.import(graphObject)
  })

  test('disconnectRules should throw Error when trying to disconnect a non-existent rule from an existent rule', () => {
    expect(() => ruleGraph.disconnectRules('non-existent rule', 'start')).toThrowError(`Rule with ID 'non-existent rule' not found.`)
  })

  test('disconnectRules should throw Error when trying to disconnect an existent rule from a non-existent rule', () => {
    expect(() => ruleGraph.disconnectRules('start', 'non-existent rule')).toThrowError(`Rule with ID 'non-existent rule' not found.`)
  })

  test('disconnectRules should throw Error if the source rule is an END rule', () => {
    expect(() => ruleGraph.disconnectRules('end', 'sign')).toThrowError('_to: RuleID is invalid, EndRule does not have dependents')
  })

  test('disconnectRules should throw Error if the target rule is a START rule', () => {
    expect(() => ruleGraph.disconnectRules('sign', 'start')).toThrowError('_from: RuleID is invalid, StartRule does not have dependencies')
  })

  test('disconnectRules should throw Error if rules are not connected', () => {
    expect(() => ruleGraph.disconnectRules('start', 'end')).toThrowError(`'start' Rule is not connected to 'end' Rule`)
  })

  test('disconnectRules should remove target from source\'s dependents and source from target\'s dependsOn', () => {
    ruleGraph.disconnectRules('start', 'sign');

    const startRule: Rule = ruleGraph.getRule('start')
    const signRule: Rule = ruleGraph.getRule('sign')

    expect(startRule.type).toStrictEqual('START')
    assert(startRule.type === 'START')
    expect(signRule.type).toStrictEqual('SIGN')
    assert(signRule.type === 'SIGN')

    expect(startRule.dependents.has(signRule.id)).toStrictEqual(false)
    expect(signRule.dependsOn.has(startRule.id)).toStrictEqual(false)
  })
})
