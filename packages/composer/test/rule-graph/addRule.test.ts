import { EndRule, OrRule, StartRule } from '@jhasuraj01/interface'
import { RuleGraph, generateEndRule, generateOrRule, generateStartRule } from 'src'
import { beforeEach, describe, expect, test } from 'vitest'

describe('RuleGraph.addRule tests', () => {
  let ruleGraph: RuleGraph

  beforeEach(() => {
    ruleGraph = RuleGraph.create({
      id: 'graph1',
      title: 'Graph 1',
      description: 'Test graph',
    })
  })

  test('Should throw error when adding START Rule', () => {
    const startRule: StartRule = generateStartRule({ id: 'start' })
    expect(() => ruleGraph.addRule(startRule)).toThrowError('START Rule cannot be added.')
  })

  test('Should throw error when adding END Rule', () => {
    const endRule: EndRule = generateEndRule({ id: 'end' })
    expect(() => ruleGraph.addRule(endRule)).toThrowError('END Rule cannot be added.')
  })

  test('Should add OR Rule successfully', () => {
    const orRule: OrRule = generateOrRule({ id: 'or', name: 'Or Rule' })
    expect(() => ruleGraph.addRule(orRule)).not.toThrow();
    expect(ruleGraph.getRule('or')).toStrictEqual({
      id: 'or',
      name: 'Or Rule',
      dependsOn: new Set(),
      dependents: new Set(),
      type: 'OR'
    })
  })
})
