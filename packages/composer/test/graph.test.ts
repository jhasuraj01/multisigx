import { RuleGraph } from 'src'
import { describe, expect, test } from 'vitest'

describe('ruleGraph.create tests', () => {
  test('Create Rule Graph with params', () => {
    const ruleGraph: RuleGraph = RuleGraph.create({
      id: 'rule-graph',
      title: 'Rule Graph',
      description: 'Test Rule Graph',
      version: 1
    })

    expect(ruleGraph).toEqual({
      graphObject: {
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
      },
      hasPath: expect.any(Function)
    })
  })

  test('Create Rule Graph without params', () => {
    const ruleGraph: RuleGraph = RuleGraph.create()

    expect(ruleGraph).toEqual({
      graphObject: {
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
      },
      hasPath: expect.any(Function)
    })
  })
})

describe('Graph Tests', () => {
  //   let ruleGraph: RuleGraph

  //   beforeEach(() => {
  //     ruleGraph = RuleGraph.create({
  //       id: 'graph1',
  //       title: 'Graph 1',
  //       description: 'Test graph',
  //     })

  //     ruleGraph.addRule(generateAndRule({ id: 'rule1', name: 'Rule 1' }))
  //     ruleGraph.addRule(generateOrRule({ id: 'rule2', name: 'Rule 2' }))
  //     ruleGraph.addRule(generateSignRule({ id: 'rule3', address: 'SignRule 3', name: 'Rule 3' }))
  //     ruleGraph.connectRules('rule1', 'rule3')
  //   })

  //   test('create function should create a rule graph', () => {
  //     expect(ruleGraph).toBeInstanceOf(RuleGraph)
  //     expect(ruleGraph.getRule('rule1').type).toEqual('AND')
  //     expect(ruleGraph.getRule('start').type).toEqual('START')
  //     expect(ruleGraph.getRule('end').type).toEqual('END')
  //     expect(ruleGraph.getRule('rule2').type).toEqual('OR')
  //     expect(ruleGraph.getRule('rule3').type).toEqual('SIGN')
  //   })

  //   test('addRule should add a rule to the graph', () => {
  //     const rule4: Rule = generateAtleastRule({ id: 'rule4', name: 'Rule 4' })

  //     ruleGraph.addRule(rule4)

  //     expect(ruleGraph.getRule('rule4')).toEqual(rule4)
  //   })

  //   test('adding End Rule should throw error', () => {
  //     const endRule: Rule = generateEndRule({ id: 'end', name: 'End Rule' })

  //     expect(() => ruleGraph.addRule(endRule)).toThrowError('END Rule cannot be added.')
  //   })

  //   test('adding Start Rule should throw error', () => {
  //     const startRule: Rule = generateStartRule({ id: 'start', name: 'Start Rule' })

  //     expect(() => ruleGraph.addRule(startRule)).toThrowError('START Rule cannot be added.')
  //   })

  //   test('Removing Non existent rules should throw error', () => {
  //     expect(() => ruleGraph.removeRule('non-existent rule')).toThrowError('_id: RuleID is invalid, Rule Not Found.')
  //   })

  //   test('removeRule should not remove START Rule', () => {
  //     expect(() => ruleGraph.removeRule('start')).toThrowError('Cannot remove START Rule.')
  //   })

  //   test('removeRule should not remove END Rule', () => {
  //     expect(() => ruleGraph.removeRule('end')).toThrowError('Cannot remove END Rule.')
  //   })

  //   test('removeRule should remove a rule from the graph', () => {
  //     ruleGraph.removeRule('rule1')

  //     expect(() => ruleGraph.getRule('rule1')).toThrowError('Rule with ID \'rule1\' not found.')
  //   })

  //   test('removeRule should remove connection from rule to dependents', () => {
  //     const rule3: Rule = ruleGraph.getRule('rule3')

  //     expect(rule3.type).toEqual('SIGN')
  //     assert(rule3.type === 'SIGN')

  //     expect(rule3.dependsOn.has('rule1')).toBe(true)
  //     ruleGraph.removeRule('rule1')
  //     expect(rule3.dependsOn.has('rule1')).toBe(false)
  //   })

  //   test('removeRule should remove connection from dependency to rule', () => {
  //     const rule1: Rule = ruleGraph.getRule('rule1') as AndRule
  //     expect(rule1.dependents.has('rule3')).toBe(true)
  //     ruleGraph.removeRule('rule3')
  //     expect(rule1.dependents.has('rule3')).toBe(false)
  //   })

  //   test('should not be able to connect to and from non-existent rules', () => {
  //     expect(() => ruleGraph.isSafeToConnect('non-existent rule', 'rule2')).toThrowError('_from: RuleID is invalid, Rule Not Found');
  //     expect(() => ruleGraph.isSafeToConnect('rule1', 'non-existent rule')).toThrowError('_to: RuleID is invalid, Rule Not Found');
  //   })

  //   test('should not be able to connect from END rule', () => {
  //     expect(() => ruleGraph.isSafeToConnect('end', 'rule1')).toThrowError('_to: RuleID is invalid, EndRule can not have dependents');
  //   })

  //   test('should not be able to connect to START rule', () => {
  //     expect(() => ruleGraph.isSafeToConnect('rule1', 'start')).toThrowError('_from: RuleID is invalid, StartRule can not have dependencies');
  //   })

  //   test('should be able connect START rule to any rule', () => {
  //     expect(ruleGraph.isSafeToConnect('start', 'rule1')).toEqual(true)
  //   })

  //   test('should be able connect any rule to END rule', () => {
  //     expect(ruleGraph.isSafeToConnect('rule1', 'end')).toEqual(true)
  //   })

  //   test('should not be able to connect rules if the graph forms a cycle', () => {
  //     expect(() => ruleGraph.connectRules('rule3', 'rule1')).toThrowError('Cyclic Edges are not possible.')
  //   })

  //   test('Non existent source rule in connectRules should throw Error', () => {
  //     expect(() => ruleGraph.connectRules('non-existent rule', 'rule1')).toThrowError('_from: RuleID is invalid, Rule Not Found')
  //   })

  //   test('Non existent target rule in connectRules should throw Error', () => {
  //     expect(() => ruleGraph.connectRules('rule1', 'non-existent rule')).toThrowError('_to: RuleID is invalid, Rule Not Found')
  //   })

  //   test('If source rule is END rule then, Error should be thrown', () => {
  //     expect(() => ruleGraph.connectRules('end', 'rule1')).toThrowError('_to: RuleID is invalid, EndRule can not have dependents')
  //   })

  //   test('If target rule is START rule then, Error should be thrown', () => {
  //     expect(() => ruleGraph.connectRules('rule1', 'start')).toThrowError('_from: RuleID is invalid, StartRule can not have dependencies')
  //   })

  //   test('Path from END rule should not exist', () => {
  //     expect(ruleGraph.hasPath('end', 'rule1')).toEqual(false)
  //   })

  //   test('Path to START rule should not exist', () => {
  //     expect(ruleGraph.hasPath('rule1', 'start')).toEqual(false)
  //   })

  //   test('Non existent source rule in hasPath should throw Error', () => {
  //     expect(() => ruleGraph.hasPath('non-existent rule', 'rule1')).toThrowError('_from: RuleID is invalid, Rule Not Found')
  //   })

  //   test('Non existent target rule in hasPath should throw Error', () => {
  //     expect(() => ruleGraph.hasPath('rule1', 'non-existent rule')).toThrowError('_to: RuleID is invalid, Rule Not Found')
  //   })

  //   test('If PATH does not exist return false', () => {
  //     expect(ruleGraph.hasPath('rule3', 'rule1')).toEqual(false)
  //   })

  //   test('If PATH exists return true', () => {
  //     expect(ruleGraph.hasPath('rule1', 'rule3')).toEqual(true)
  //   })

  //   test('Non existent source rule in disconnectRules should throw Error', () => {
  //     expect(() => ruleGraph.disconnectRules('non-existent rule', 'rule1')).toThrowError('_from: RuleID is invalid, Rule Not Found')
  //   })

  //   test('Non existent target rule in disconnectRules should throw Error', () => {
  //     expect(() => ruleGraph.disconnectRules('rule1', 'non-existent rule')).toThrowError('_to: RuleID is invalid, Rule Not Found')
  //   })

  //   test('If source rule is END rule then, Error should be thrown', () => {
  //     expect(() => ruleGraph.disconnectRules('end', 'rule1')).toThrowError('_to: RuleID is invalid, EndRule does not have dependents')
  //   })

  //   test('If target rule is START rule then, Error should be thrown', () => {
  //     expect(() => ruleGraph.disconnectRules('rule1', 'start')).toThrowError('_from: RuleID is invalid, StartRule does not have dependencies')
  //   })

  //   test('disconnectRules should remove target from source dependents', () => {
  //     const rule1: Rule = ruleGraph.getRule('rule1') as AndRule
  //     expect(rule1.dependents.has('rule3')).toBe(true)
  //     ruleGraph.disconnectRules('rule1', 'rule3')
  //     expect(rule1.dependents.has('rule3')).toBe(false)
  //   })

  //   test('disconnectRules should remove source from target dependencies', () => {
  //     const rule3: Rule = ruleGraph.getRule('rule3') as SignRule
  //     expect(rule3.dependsOn.has('rule1')).toBe(true)
  //     ruleGraph.disconnectRules('rule1', 'rule3')
  //     expect(rule3.dependsOn.has('rule1')).toBe(false)
  //   })

  test('', () => {

  })
})
