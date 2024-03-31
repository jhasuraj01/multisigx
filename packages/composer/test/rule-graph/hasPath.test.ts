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
      dependents: new Set(['sign-director']),
      type: 'START'
    }],
    ['sign-director', {
      id: 'sign-director',
      address: 'director',
      name: 'Sign Rule Director',
      dependsOn: new Set(['start']),
      dependents: new Set(['sign-hod']),
      type: 'SIGN',
      internalLogic: {
        type: 'AND'
      }
    }],
    ['sign-hod', {
      id: 'sign-hod',
      address: 'hod',
      name: 'Sign Rule HOD',
      dependsOn: new Set(['sign-director']),
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
      dependsOn: new Set(['sign-hod']),
      internalLogic: {
        type: 'AND'
      }
    }]
  ]),
}

describe('RuleGraph.hasPath tests', () => {
  let ruleGraph: RuleGraph

  beforeEach(() => {
    ruleGraph = RuleGraph.import(graphObject)
  })

  test('hasPath should throw Error for non-existent start rule', () => {
    // @ts-expect-error
    expect(() => ruleGraph.hasPath('non-existent rule', 'start')).toThrowError(`Rule with ID 'non-existent rule' not found.`)
  })

  test('hasPath should throw Error for non-existent end rule', () => {
    // @ts-expect-error
    expect(() => ruleGraph.hasPath('start', 'non-existent rule')).toThrowError(`Rule with ID 'non-existent rule' not found.`)
  })

  test('hasPath should return true for existing path from sign-director to sign-hod', () => {
    // @ts-expect-error
    expect(ruleGraph.hasPath('sign-director', 'sign-hod')).toBe(true)
  })

  test('hasPath should return true for existing path from sign-hod to sign-hod', () => {
    // @ts-expect-error
    expect(ruleGraph.hasPath('sign-hod', 'sign-hod')).toBe(true)
  })

  test('hasPath should return false for non-existent path from sign-hod to sign-director', () => {
    // @ts-expect-error
    expect(ruleGraph.hasPath('sign-hod', 'sign-director')).toBe(false)
  })

  test('hasPath should return false for non-existent path from end to sign-hod', () => {
    // @ts-expect-error
    expect(ruleGraph.hasPath('end', 'sign-hod')).toBe(false)
  })

  test('hasPath should return false for non-existent path from sign-director to start', () => {
    // @ts-expect-error
    expect(ruleGraph.hasPath('sign-director', 'start')).toBe(false)
  })
})
