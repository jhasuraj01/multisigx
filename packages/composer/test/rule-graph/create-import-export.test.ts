import { RuleGraph } from 'src'
import { describe, expect, test } from 'vitest'

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

describe('RuleGraph.create tests', () => {
  test('should create RuleGraph with specified parameters', () => {
    const ruleGraph: RuleGraph = RuleGraph.create({
      id: 'rule-graph',
      title: 'Rule Graph',
      description: 'Test Rule Graph'
    })

    expect(ruleGraph.export()).toStrictEqual({
      id: 'rule-graph',
      title: 'Rule Graph',
      description: 'Test Rule Graph',
      identifier: 'multisigx-rule_graph_object',
      version: 1,
      rules: new Map([
        ['start', {
          id: 'start',
          name: 'Start Rule',
          dependents: new Set(),
          type: 'START'
        }],
        ['end', {
          id: 'end',
          name: 'End Rule',
          type: 'END',
          dependsOn: new Set(),
          internalLogic: {
            type: 'AND'
          }
        }]
      ]),
    })
  })

  test('should create RuleGraph with default parameters when none are specified', () => {
    const ruleGraph: RuleGraph = RuleGraph.create()

    expect(ruleGraph.export()).toStrictEqual({
      id: expect.stringMatching(/^.{1,}$/),
      title: expect.stringMatching(/^.{1,}$/),
      description: '',
      identifier: 'multisigx-rule_graph_object',
      version: 1,
      rules: new Map([
        ['start', {
          id: 'start',
          name: 'Start Rule',
          dependents: new Set(),
          type: 'START'
        }],
        ['end', {
          id: 'end',
          name: 'End Rule',
          type: 'END',
          dependsOn: new Set(),
          internalLogic: {
            type: 'AND'
          }
        }]
      ]),
    })
  })
})

describe('RuleGraph.import tests', () => {
  test('should import compatible objects correctly', () => {
    const ruleGraph: RuleGraph = RuleGraph.import(graphObject)

    expect(ruleGraph.export()).toStrictEqual(graphObject)
  })

  test('should throw an error when trying to import incompatible objects', () => {
    const graphObject: object = {}

    expect(() => RuleGraph.import(graphObject)).toThrowError()
  })
})