import { KeyValueStorage, db } from '../src/core'
import { afterEach, describe, expect, expectTypeOf, test } from 'vitest'

describe('storage Tests', () => {
  const storage = new KeyValueStorage<string | null | undefined | object>(
    db,
    'key-value-storage-test'
  )

  afterEach(async () => {
    await storage.clear()
  })

  test('should store and retrive a data', async () => {
    expectTypeOf(storage.setItem('key', 'some_value')).resolves.toBeVoid()
    await expect(storage.setItem('key', 'some_value')).resolves.toBeUndefined()
    await expect(storage.getItem('key')).resolves.toStrictEqual('some_value')
  })

  test('should store and retrive null value', async () => {
    expectTypeOf(storage.setItem('null_key', null)).resolves.toBeVoid()
    await expect(storage.setItem('null_key', null)).resolves.toBeUndefined()
    await expect(storage.getItem('null_key')).resolves.toBeNull()
  })

  test('should store and retrive undefined value', async () => {
    expectTypeOf(
      storage.setItem('undefined_key', undefined)
    ).resolves.toBeVoid()
    await expect(
      storage.setItem('undefined_key', undefined)
    ).resolves.toBeUndefined()
    await expect(storage.getItem('undefined_key')).resolves.toBeUndefined()
  })

  test('should return undefined when data is not preset', async () => {
    await expect(storage.getItem('some_random_key')).resolves.toBeUndefined()
  })

  test('should update and retrive updated data', async () => {
    await storage.setItem('key', 'some_value')
    await storage.setItem('key', 'some_new_value')
    await expect(storage.getItem('key')).resolves.toStrictEqual(
      'some_new_value'
    )
  })

  test('should delete data', async () => {
    await storage.setItem('key', 'some_value')
    await expect(storage.removeItem('key')).resolves.toBeUndefined()
    await expect(storage.getItem('key')).resolves.toBeUndefined()
  })

  test('should return all keys', async () => {
    await expect(storage.getKeys()).resolves.toStrictEqual([])

    await storage.setItem('key_1', 'some_value')
    await storage.setItem('key_2', null)
    await storage.setItem('key_3', undefined)
    await storage.setItem('key_4', [])
    await storage.setItem('key_5', {})

    await expect(storage.getKeys()).resolves.toStrictEqual([
      'key_1',
      'key_2',
      'key_3',
      'key_4',
      'key_5'
    ])
  })

  test('should return all entries', async () => {
    await expect(storage.getEntries()).resolves.toStrictEqual([])

    await storage.setItem('key_1', 'some_value')
    await storage.setItem('key_2', null)
    await storage.setItem('key_3', undefined)
    await storage.setItem('key_4', [])
    await storage.setItem('key_5', {})

    await expect(storage.getEntries()).resolves.toStrictEqual([
      ['key_1', 'some_value'],
      ['key_2', null],
      ['key_3', undefined],
      ['key_4', []],
      ['key_5', {}]
    ])
  })

  test('should not throw error when deleting non existent data', async () => {
    await expect(storage.removeItem('1')).resolves.toBeUndefined()
  })
})
