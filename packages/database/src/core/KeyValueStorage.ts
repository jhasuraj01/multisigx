import { Level } from 'level'
import type { IKeyValueStorage } from '@jhasuraj01/interface'
import { serialize, deserialize } from '@jhasuraj01/utils'
import { databasePrefix } from './constants'

export class KeyValueStorage<T> implements IKeyValueStorage<T> {
  private readonly db

  constructor(readonly name: string) {
    this.db = new Level<string, T>(databasePrefix + name, {
      valueEncoding: 'json',
      version: 1
    })
  }

  async setItem(key: string, value: T): Promise<void> {
    await this.db.open()
    await this.db.put(key, serialize(value) as T)
  }

  async getItem(key: string): Promise<T | undefined> {
    await this.db.open()
    try {
      return (await this.db.get(key).then(deserialize)) as T
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 'LEVEL_NOT_FOUND'
      ) {
        return undefined
      }
      throw error
    }
  }

  async removeItem(key: string): Promise<void> {
    await this.db.open()
    await this.db.del(key)
  }

  async getEntries(): Promise<Array<[string, T]>> {
    await this.db.open()
    return (await this.db.iterator().all()).map(([key, value]) => [
      key,
      deserialize(value) as T
    ])
  }

  async getKeys(): Promise<string[]> {
    await this.db.open()
    return await this.db.keys().all()
  }

  async clear(): Promise<void> {
    await this.db.open()
    await this.db.clear()
  }
}
