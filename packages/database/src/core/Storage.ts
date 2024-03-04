import { type Level } from 'level'
import type { Database, DatabaseItemType } from '@jhasuraj01/interface'
import { serialize, deserialize } from '@jhasuraj01/utils'

export class Storage<T extends DatabaseItemType> implements Database<T> {
  private readonly db

  constructor(
    db: Level,
    readonly name: string
  ) {
    this.db = db.sublevel<string, T>(name, { valueEncoding: 'json' })
  }

  async writeOne(data: T): Promise<void> {
    await this.db.put(data.id, serialize(data) as T)
  }

  async findOneById(id: T['id']): Promise<T> {
    return (await this.db.get(id).then(deserialize)) as T
  }

  async deleteOneById(id: T['id']): Promise<void> {
    await this.db.del(id)
  }

  async getAll(): Promise<T[]> {
    return (await this.db.values().all()).map(deserialize) as T[]
  }

  async getAllIds(): Promise<Array<T['id']>> {
    return await this.db.keys().all()
  }
}
