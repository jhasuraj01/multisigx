import { RuleGraph } from 'src'
import { beforeEach, describe, expect, test } from 'vitest'

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

describe('RuleGraph.getRule tests', () => {
  let ruleGraph: RuleGraph

  beforeEach(() => {
    ruleGraph = RuleGraph.import(graphObject)
  })

  test('Can not get non-existent rules', () => {
    expect(() => ruleGraph.getRule('non-existent rule')).toThrowError(`Rule with ID 'non-existent rule' not found.`)
  })

  test('Should get existent rules', () => {
    expect(ruleGraph.getRule('start')).toStrictEqual({
      id: 'start',
      name: 'Start Rule',
      dependents: new Set(['sign']),
      type: 'START'
    })
    expect(ruleGraph.getRule('sign')).toStrictEqual({
      id: 'sign',
      address: 'director',
      name: 'Sign Rule',
      dependsOn: new Set(['start']),
      dependents: new Set(['end']),
      type: 'SIGN',
      internalLogic: {
        type: 'AND'
      }
    })
    expect(ruleGraph.getRule('end')).toStrictEqual({
      id: 'end',
      name: 'End Rule',
      type: 'END',
      dependsOn: new Set(['sign']),
      internalLogic: {
        type: 'AND'
      }
    })
  })
})
