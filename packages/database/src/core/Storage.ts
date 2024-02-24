import { type Level } from 'level'
import type { Database, DatabaseItemType } from './interface'

export class Storage<T extends DatabaseItemType> implements Database<T> {
  private readonly db

  constructor(
    db: Level,
    readonly name: string
  ) {
    this.db = db.sublevel<string, T>(name, { valueEncoding: 'json' })
  }

  async writeOne(data: T): Promise<void> {
    await this.db.put(data.id, data)
  }

  async findOneById(id: T['id']): Promise<T> {
    return await this.db.get(id)
  }

  async deleteOneById(id: T['id']): Promise<void> {
    await this.db.del(id)
  }

  async getAll(): Promise<T[]> {
    return await this.db.values().all()
  }

  async getAllIds(): Promise<Array<T['id']>> {
    return await this.db.keys().all()
  }
}
