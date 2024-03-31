import { type Level } from 'level'
import type { IDatabase, IDatabaseItemType } from '@jhasuraj01/interface'
import { serialize, deserialize } from '@jhasuraj01/utils'

export class Storage<T extends IDatabaseItemType> implements IDatabase<T> {
  private readonly db

  constructor(
    db: Level,
    readonly name: string
  ) {
    this.db = db.sublevel<string, T>(name, { valueEncoding: 'json' })
  }

  async writeOne(data: T): Promise<void> {
    await this.db.open()
    await this.db.put(data.id, serialize(data) as T)
  }

  async findOneById(id: T['id']): Promise<T> {
    await this.db.open()
    return (await this.db.get(id).then(deserialize)) as T
  }

  async deleteOneById(id: T['id']): Promise<void> {
    await this.db.open()
    await this.db.del(id)
  }

  async getAll(): Promise<T[]> {
    await this.db.open()
    return (await this.db.values().all()).map(deserialize) as T[]
  }

  async getAllIds(): Promise<Array<T['id']>> {
    await this.db.open()
    return await this.db.keys().all()
  }

  async clear(): Promise<void> {
    await this.db.open()
    await this.db.clear()
  }
}
