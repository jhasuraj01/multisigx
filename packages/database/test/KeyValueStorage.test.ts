import { KeyValueStorage, db } from '../src/core'
import { describe, expect, expectTypeOf, test } from 'vitest'

const storage = new KeyValueStorage<string>(db, 'key-value-storage')

describe('storage Tests', () => {
  test('should store a data', async () => {
    expectTypeOf(storage.setItem('key', 'some_value')).resolves.toBeVoid()
    await expect(storage.setItem('key', 'some_value')).resolves.toBeUndefined()
  })

  test('should store and retrive null value', async () => {
    expectTypeOf(storage.setItem('null_key', null)).resolves.toBeVoid()
    await expect(storage.setItem('key', null)).resolves.toBeUndefined()
  })

  test('should retrive a stored data', async () => {
    await expect(storage.getItem('key')).resolves.toStrictEqual('some_value')
  })

  test('should return when data is not preset', async () => {
    await expect(storage.getItem('some_random_key')).resolves.toBeUndefined()
  })

  test('should update and retrive updated data', async () => {
    await expect(storage.getItem('key')).resolves.toStrictEqual('some_value')
    await expect(storage.setItem('key', 'some_new_value')).resolves.toBeUndefined()
    await expect(storage.getItem('key')).resolves.toStrictEqual('some_new_value')
  })

  test('should delete data', async () => {
    await expect(storage.removeItem('key')).resolves.toBeUndefined()
    await expect(storage.getItem('key')).resolves.toBeUndefined()
  })

  test('should return all keys', async () => {
    await expect(storage.getKeys()).resolves.toStrictEqual([])
    expectTypeOf(storage.setItem('key', 'some_value')).resolves.toBeVoid()
    await expect(storage.getKeys()).resolves.toStrictEqual([ 'key' ])
  })

  test('should return all entries', async () => {
    await expect(storage.getEntries()).resolves.toStrictEqual([['key', 'some_value']])
  })

  test('should not throw error when deleting non existent data', async () => {
    await expect(storage.removeItem('1')).resolves.toBeUndefined()
  })
})
