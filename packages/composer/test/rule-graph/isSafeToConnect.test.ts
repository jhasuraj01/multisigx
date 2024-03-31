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

describe('RuleGraph.isSafeToConnect tests', () => {
  let ruleGraph: RuleGraph

  beforeEach(() => {
    ruleGraph = RuleGraph.import(graphObject)
  })

  test('isSafeToConnect(non-existent rule, existent rule) should throw Error', () => {
    expect(() => ruleGraph.isSafeToConnect('non-existent rule', 'start')).toThrowError(`Rule with ID 'non-existent rule' not found.`)
  })

  test('isSafeToConnect(existent rule, non-existent rule) should throw Error', () => {
    expect(() => ruleGraph.isSafeToConnect('start', 'non-existent rule')).toThrowError(`Rule with ID 'non-existent rule' not found.`)
  })

  test('Check if can connect from sign-hod to start should throw Error', () => {
    expect(() => ruleGraph.isSafeToConnect('sign-hod', 'start')).toThrowError('_from: RuleID is invalid, StartRule can not have dependencies')
  })

  test('Check if can connect from end to sign-director should throw Error', () => {
    expect(() => ruleGraph.isSafeToConnect('end', 'sign-director')).toThrowError('_to: RuleID is invalid, EndRule can not have dependents')
  })

  test('Check if can connect from sign-director to end should return true', () => {
    expect(ruleGraph.isSafeToConnect('sign-director', 'end')).toBe(true)
  })

  test('Check if can connect from sign-hod to sign-hod should return false', () => {
    expect(ruleGraph.isSafeToConnect('sign-hod', 'sign-hod')).toBe(false)
  })

  test('Check if can connect from sign-hod to sign-director should return false', () => {
    expect(ruleGraph.isSafeToConnect('sign-hod', 'sign-director')).toBe(false)
  })

  test('Check if can connect from sign-director to sign-hod should return true', () => {
    expect(ruleGraph.isSafeToConnect('sign-director', 'sign-hod')).toBe(true)
  })
})
