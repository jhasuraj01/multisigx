import { type Level } from 'level'
import type { IKeyValueStorage } from '@jhasuraj01/interface'
import { serialize, deserialize } from '@jhasuraj01/utils'

export class KeyValueStorage<T> implements IKeyValueStorage<T> {
  private readonly db

  constructor(
    db: Level,
    readonly name: string
  ) {
    this.db = db.sublevel<string, T>(name, { valueEncoding: 'json' })
  }

  async setItem(key: string, value: T): Promise<void> {
    await this.db.put(key, serialize(value) as T)
  }

  async getItem(key: string): Promise<T | undefined> {
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
    await this.db.del(key)
  }

  async getEntries(): Promise<Array<[string, T]>> {
    return (await this.db.iterator().all()).map(([key, value]) => [
      key,
      deserialize(value) as T
    ])
  }

  async getKeys(): Promise<string[]> {
    return await this.db.keys().all()
  }
}
