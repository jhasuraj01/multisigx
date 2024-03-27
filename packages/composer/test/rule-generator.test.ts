import { AndRule, AtleastRule, EndRule, OrRule, SignRule, StartRule } from '@jhasuraj01/interface'
import { describe, expect, test } from 'vitest'
import { generateAndRule, generateAtleastRule, generateEndRule, generateOrRule, generateSignRule, generateStartRule } from '../src/index'

describe('AND Rule Generator Tests', () => {
  test('Should generate AND Rule with params', () => {
    const rule: AndRule = generateAndRule({ id: 'and-rule', name: 'AND Rule' })
    expect(rule).toStrictEqual({
      id: 'and-rule',
      name: 'AND Rule',
      dependsOn: new Set(),
      dependents: new Set(),
      type: 'AND'
    })
  })

  test('Should generate AND Rule without params', () => {
    const rule: AndRule = generateAndRule()
    expect(rule.id).toBeTypeOf("string")
    expect(rule.name).toBeTypeOf("string")
    expect(rule.id.length).toBeGreaterThan(0)
    expect(rule.name.length).toBeGreaterThan(0)
    expect(rule.dependents).toStrictEqual(new Set())
    expect(rule.dependsOn).toStrictEqual(new Set())
    expect(rule.type).toBe('AND')
  })
})

describe('OR Rule Generator Tests', () => {
  test('Should generate OR Rule with params', () => {
    const rule: OrRule = generateOrRule({ id: 'or-rule', name: 'OR Rule' })
    expect(rule).toStrictEqual({
      id: 'or-rule',
      name: 'OR Rule',
      dependsOn: new Set(),
      dependents: new Set(),
      type: 'OR'
    })
  })

  test('Should generate OR Rule without params', () => {
    const rule: OrRule = generateOrRule()
    expect(rule.id).toBeTypeOf("string")
    expect(rule.name).toBeTypeOf("string")
    expect(rule.id.length).toBeGreaterThan(0)
    expect(rule.name.length).toBeGreaterThan(0)
    expect(rule.dependents).toStrictEqual(new Set())
    expect(rule.dependsOn).toStrictEqual(new Set())
    expect(rule.type).toBe('OR')
  })
})

describe('START Rule Generator Tests', () => {
  test('Should generate START Rule with params', () => {
    const rule: StartRule = generateStartRule({ id: 'start-rule', name: 'START Rule' })
    expect(rule).toStrictEqual({
      id: 'start-rule',
      name: 'START Rule',
      dependents: new Set(),
      type: 'START'
    })
  })

  test('Should generate START Rule without params', () => {
    const rule: StartRule = generateStartRule()
    expect(rule.id).toBeTypeOf("string")
    expect(rule.name).toBeTypeOf("string")
    expect(rule.id.length).toBeGreaterThan(0)
    expect(rule.name.length).toBeGreaterThan(0)
    expect(rule.dependents).toStrictEqual(new Set())
    expect(rule).not.toHaveProperty('dependsOn')
    expect(rule.type).toBe('START')
  })
})

describe('END Rule Generator Tests', () => {
  test('Should generate END Rule with params with Internal Logic', () => {
    const rule: EndRule = generateEndRule({ id: 'end-rule', name: 'END Rule', internalLogic: { type: 'OR' } })
    expect(rule).toStrictEqual({
      id: 'end-rule',
      name: 'END Rule',
      dependsOn: new Set(),
      internalLogic: { type: 'OR' },
      type: 'END'
    })
  })

  test('Should generate END Rule with params without Internal Logic', () => {
    const rule: EndRule = generateEndRule({ id: 'end-rule', name: 'END Rule' })
    expect(rule).toStrictEqual({
      id: 'end-rule',
      name: 'END Rule',
      dependsOn: new Set(),
      internalLogic: { type: 'AND' },
      type: 'END'
    })
  })

  test('Should generate END Rule without params', () => {
    const rule: EndRule = generateEndRule()
    expect(rule.id).toBeTypeOf("string")
    expect(rule.name).toBeTypeOf("string")
    expect(rule.id.length).toBeGreaterThan(0)
    expect(rule.name.length).toBeGreaterThan(0)
    expect(rule.dependsOn).toStrictEqual(new Set())
    expect(rule).not.toHaveProperty('dependents')
    expect(rule.internalLogic).toStrictEqual({ type: 'AND' })
    expect(rule.type).toBe('END')
  })
})

describe('SIGN Rule Generator Tests', () => {
  test('Should generate SIGN Rule with params with Internal Logic', () => {
    const rule: SignRule = generateSignRule({ id: 'sign-rule', address: 'director', name: 'SIGN Rule', internalLogic: { type: 'OR' } })
    expect(rule).toStrictEqual({
      id: 'sign-rule',
      name: 'SIGN Rule',
      address: 'director',
      dependsOn: new Set(),
      dependents: new Set(),
      internalLogic: { type: 'OR' },
      type: 'SIGN'
    })
  })

  test('Should generate SIGN Rule with params without Internal Logic', () => {
    const rule: SignRule = generateSignRule({ id: 'sign-rule', address: 'director', name: 'SIGN Rule' })
    expect(rule).toStrictEqual({
      id: 'sign-rule',
      name: 'SIGN Rule',
      address: 'director',
      dependsOn: new Set(),
      dependents: new Set(),
      internalLogic: { type: 'AND' },
      type: 'SIGN'
    })
  })

  test('Should generate SIGN Rule with only address param', () => {
    const rule: SignRule = generateSignRule({address: 'director'})
    expect(rule.id).toBeTypeOf("string")
    expect(rule.name).toBeTypeOf("string")
    expect(rule.id.length).toBeGreaterThan(0)
    expect(rule.name.length).toBeGreaterThan(0)
    expect(rule.dependsOn).toStrictEqual(new Set())
    expect(rule.dependents).toStrictEqual(new Set())
    expect(rule.internalLogic).toStrictEqual({ type: 'AND' })
    expect(rule.type).toBe('SIGN')
  })
})

describe('ATLEAST Rule Generator Tests', () => {
  test('Should generate ATLEAST Rule with params', () => {
    const rule: AtleastRule = generateAtleastRule({ id: 'atleast-rule', name: 'ATLEAST Rule', count: 2 })
    expect(rule).toStrictEqual({
      id: 'atleast-rule',
      name: 'ATLEAST Rule',
      dependents: new Set(),
      dependsOn: new Set(),
      count: 2,
      type: 'ATLEAST'
    })
  })

  test('Should generate ATLEAST Rule without params', () => {
    const rule: AtleastRule = generateAtleastRule()
    expect(rule.id).toBeTypeOf("string")
    expect(rule.name).toBeTypeOf("string")
    expect(rule.id.length).toBeGreaterThan(0)
    expect(rule.name.length).toBeGreaterThan(0)
    expect(rule.dependents).toStrictEqual(new Set())
    expect(rule.dependsOn).toStrictEqual(new Set())
    expect(rule.count).toBe(1)
    expect(rule.type).toBe('ATLEAST')
  })
})