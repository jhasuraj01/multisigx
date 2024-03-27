export interface DatabaseItemType {
  id: string
}

export interface Database<T extends DatabaseItemType> {
  writeOne: (data: T) => Promise<void>
  findOneById: (id: T['id']) => Promise<T>
  deleteOneById: (id: T['id']) => Promise<void>
  getAllIds: () => Promise<Array<T['id']>>
  getAll: () => Promise<T[]>
}
