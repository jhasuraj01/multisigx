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

describe('RuleGraph.connectRules tests', () => {
  let ruleGraph: RuleGraph

  beforeEach(() => {
    ruleGraph = RuleGraph.import(graphObject)
  })

  test('Should throw error when connecting a non-existent rule to an existent rule', () => {
    expect(() => ruleGraph.connectRules('non-existent rule', 'start')).toThrowError(`Rule with ID 'non-existent rule' not found.`)
  })

  test('Should throw an error when connecting an existent rule to a non-existent rule', () => {
    expect(() => ruleGraph.connectRules('start', 'non-existent rule')).toThrowError(`Rule with ID 'non-existent rule' not found.`)
  })

  test(`Should throw an error when connecting from 'sign-hod' to 'start'`, () => {
    expect(() => ruleGraph.connectRules('sign-hod', 'start')).toThrowError('_from: RuleID is invalid, StartRule can not have dependencies')
  })

  test(`Should throw an error when connecting from 'end' to 'sign-director'`, () => {
    expect(() => ruleGraph.connectRules('end', 'sign-director')).toThrowError('_to: RuleID is invalid, EndRule can not have dependents')
  })

  test(`Should throw an error when connecting from 'sign-hod' to 'sign-hod'`, () => {
    expect(() => ruleGraph.connectRules('sign-hod', 'sign-hod')).toThrowError('Cyclic Edges are not possible.')
  })

  test(`Should throw an error when connecting from 'sign-hod' to 'sign-director'`, () => {
    expect(() => ruleGraph.connectRules('sign-hod', 'sign-director')).toThrowError('Cyclic Edges are not possible.')
  })

  test(`Should connect from 'sign-director' to 'end'`, () => {
    ruleGraph.connectRules('sign-director', 'end')

    const signDirector: Rule = ruleGraph.getRule('sign-director')
    const endRule: Rule = ruleGraph.getRule('end')

    assert(signDirector.type === 'SIGN')
    assert(endRule.type === 'END')
    
    expect(signDirector.dependents.has(endRule.id)).toBe(true)
    expect(endRule.dependsOn.has(signDirector.id)).toBe(true)
  })
})