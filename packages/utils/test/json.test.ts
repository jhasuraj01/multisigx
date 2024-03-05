import { describe, expect, test } from 'vitest'
import { serialize, deserialize, oneWaySerialize } from '../src'

const primitives = ['string', 123, true, false, null, undefined] as const

const bigints = [
  123n,
  BigInt('1234'),
  BigInt(12345),
  BigInt(123456n),
  BigInt(true),
  BigInt(false)
] as const

const dates = [
  new Date(),
  new Date(0),
  new Date('2021-01-01'),
  new Date(Date.now())
] as const

const symbols = [Symbol('mysymbol'), Symbol(123), Symbol(undefined)] as const

const sets = [
  new Set(primitives),
  new Set(bigints),
  new Set(dates),
  new Set([new Set(primitives), new Set(bigints), new Set(dates)]),
  new Set([
    new Map(primitives.map((value) => [value, value])),
    new Map(bigints.map((value) => [value, value])),
    new Map(dates.map((value) => [value, value]))
  ])
] as const

const maps = [
  new Map(primitives.map((value) => [value, value])),
  new Map(sets.map((value) => [value, value])),
  new Map(bigints.map((value) => [value, value])),
  new Map(dates.map((value) => [value, value]))
] as const

const object = {
  sets,
  maps,
  primitives,
  bigints
} as const

const array = [primitives, bigints, sets, maps, object] as const

describe('tests: serialize and deserialize json', () => {
  test('should serialize and deserialize primitives', () => {
    for (const value of primitives) {
      expect(deserialize(serialize(value))).toBe(value)
    }
  })

  test('should serialize and deserialize bigints', () => {
    for (const value of bigints) {
      expect(deserialize(serialize(value))).toBe(value)
    }
  })

  test('should serialize and deserialize dates', () => {
    for (const value of dates) {
      expect(deserialize(serialize(value))).toStrictEqual(value)
    }
  })

  test('should serialize and deserialize sets', () => {
    for (const value of sets) {
      expect(deserialize(serialize(value))).toStrictEqual(value)
    }
  })

  test('should serialize and deserialize maps', () => {
    for (const value of maps) {
      expect(deserialize(serialize(value))).toStrictEqual(value)
    }
  })

  test('should serialize and deserialize object', () => {
    expect(deserialize(serialize(object))).toStrictEqual(object)
  })

  test('should serialize and deserialize array', () => {
    expect(deserialize(serialize(array))).toStrictEqual(array)
  })

  test('should serialize and deserialize array of symbols', () => {
    const deserializedSymbols = deserialize(
      serialize(symbols)
    ) as typeof symbols
    expect(deserializedSymbols.map(String)).toStrictEqual(symbols.map(String))
  })
})

describe('tests: one way serialize json', () => {
  test('should one way serialize primitives', () => {
    for (const value of primitives) {
      expect(oneWaySerialize(value)).toBe(value)
    }
  })

  test('should one way serialize bigints', () => {
    for (const value of bigints) {
      expect(oneWaySerialize(value)).toBe(value.toString())
    }
  })

  test('should one way serialize dates', () => {
    for (const value of dates) {
      expect(oneWaySerialize(value)).toBe(value.toISOString())
    }
  })

  test('should one way serialize sets', () => {
    expect(oneWaySerialize(new Set(primitives))).toStrictEqual(primitives)
    expect(oneWaySerialize(new Set(bigints))).toStrictEqual(bigints.map(String))
    expect(oneWaySerialize(new Set(dates))).toStrictEqual(
      dates.map((date) => date.toISOString())
    )
  })

  test('should one way serialize maps', () => {
    expect(
      oneWaySerialize(new Map(primitives.map((value) => [value, value])))
    ).toStrictEqual(
      Object.fromEntries(primitives.map((value) => [value, value]))
    )
    expect(
      oneWaySerialize(new Map(bigints.map((value) => [value, value])))
    ).toStrictEqual(
      Object.fromEntries(
        bigints.map((value) => [value.toString(), value.toString()])
      )
    )
    expect(
      oneWaySerialize(new Map(dates.map((value) => [value, value])))
    ).toStrictEqual(
      Object.fromEntries(
        dates.map((value) => [value.toISOString(), value.toISOString()])
      )
    )
  })

  test('should one way serialize object', () => {
    expect(oneWaySerialize({ primitives })).toStrictEqual({ primitives })
  })

  test('should one way serialize array', () => {
    expect(oneWaySerialize(primitives)).toStrictEqual(primitives)
    expect(oneWaySerialize(bigints)).toStrictEqual(
      bigints.map((bn) => bn.toString())
    )
    expect(oneWaySerialize(dates)).toStrictEqual(
      dates.map((date) => date.toISOString())
    )
  })

  test('should one way serialize array of symbols', () => {
    expect(oneWaySerialize(symbols)).toStrictEqual(symbols.map(String))
  })
})
