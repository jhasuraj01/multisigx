import { Storage, db } from '../src/core'
import { beforeAll, describe, expect, expectTypeOf, test } from 'vitest'

const data = {
  id: '1',
  data: 'some data',
  array: ['array', 'with', 'some', 'value'],
  object: {
    key: 'value',
    array: ['array', 'with', 'some', 'value'],
    object: {
      key: 'value'
    }
  }
}

describe('storage Tests', () => {
  let storage: Storage<typeof data>

  beforeAll(() => {
    storage = new Storage<typeof data>(db, 'raw-storage')
  })

  test('should store a data', async () => {
    expectTypeOf(storage.writeOne(data)).resolves.toBeVoid()
    await expect(storage.writeOne(data)).resolves.toBeUndefined()
  })

  test('should retrive a stored data', async () => {
    await expect(storage.findOneById('1')).resolves.toStrictEqual(data)
  })

  test('should update a stored data', async () => {
    data.object.array = ['array', 'with', 'new', 'value']
    expectTypeOf(storage.writeOne(data)).resolves.toBeVoid()
    await expect(storage.writeOne(data)).resolves.toBeUndefined()
  })

  test('should retrive a updated data', async () => {
    await expect(storage.findOneById('1')).resolves.toStrictEqual(data)
  })

  test('should delete data', async () => {
    await expect(storage.deleteOneById('1')).resolves.toBeUndefined()
  })

  test('should return empty array when no data is present', async () => {
    await expect(storage.getAll()).resolves.toStrictEqual([])
    await expect(storage.getAllIds()).resolves.toStrictEqual([])
  })

  test('should throw error when data not found', async () => {
    await expect(storage.findOneById('1')).rejects.toThrowError()
  })

  test('should not throw error when deleting non existent data', async () => {
    await expect(storage.deleteOneById('1')).resolves.toBeUndefined()
  })
})
