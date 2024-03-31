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

describe('RuleGraph.removeRule tests', () => {
  let ruleGraph: RuleGraph

  beforeEach(() => {
    ruleGraph = RuleGraph.import(graphObject)
  })

  test('Cannot remove START and END rules', () => {
    expect(() => ruleGraph.removeRule('start')).toThrowError('Cannot remove START Rule')
    expect(() => ruleGraph.removeRule('end')).toThrowError('Cannot remove END Rule')
  })

  test('Once rule is removed it should not be accessible', () => {
    ruleGraph.removeRule('sign')
    expect(() => ruleGraph.getRule('sign')).toThrowError(`Rule with ID 'sign' not found.`)
  })

  test('Once rule is removed its connections to other rules must be removed', () => {
    ruleGraph.removeRule('sign')

    const startRule: Rule = ruleGraph.getRule('start')
    const endRule: Rule = ruleGraph.getRule('end')

    expect(startRule.type).toStrictEqual('START')
    assert(startRule.type === 'START')
    expect(endRule.type).toStrictEqual('END')
    assert(endRule.type === 'END')

    expect(startRule.dependents.has('sign')).toStrictEqual(false)
    expect(endRule.dependsOn.has('sign')).toStrictEqual(false)
  })
})
