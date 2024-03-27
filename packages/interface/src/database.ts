export interface IDatabaseItemType {
  id: string
}

export interface IDatabase<T extends IDatabaseItemType> {
  writeOne: (data: T) => Promise<void>
  findOneById: (id: T['id']) => Promise<T>
  deleteOneById: (id: T['id']) => Promise<void>
  getAllIds: () => Promise<Array<T['id']>>
  getAll: () => Promise<T[]>
  clear: () => Promise<void>
}

export interface IKeyValueStorage<T> {
  getKeys: () => Promise<string[]>
  getEntries: () => Promise<Array<[string, T]>>
  getItem: (key: string) => Promise<T | undefined>
  setItem: (key: string, value: T) => Promise<void>
  removeItem: (key: string) => Promise<void>
  clear: () => Promise<void>
}
