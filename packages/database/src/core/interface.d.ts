export interface DatabaseItemType {
  id: string
}

export interface Database<T extends DatabaseItemType> {
  writeOne: (data: T) => Promise<void>
  findOneById: (id: T['id']) => Promise<T>
  deleteOneById: (id: T['id']) => Promise<void>
  getAllIds: () => Promise<Array<T['id']>>
  getAll: () => Promise<T[]>
  // insertMany: (data: T[]) => Promise<void>;
  // findMany: (query: Partial<T>) => Promise<T[]>;
  // deleteMany: (query: Partial<T>) => Promise<T[]>;
  // updateMany: (query: Partial<T>, data: Partial<T>) => Promise<T[]>;
}
