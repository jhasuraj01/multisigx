import type { Level } from 'level'
import { Storage } from '../core'

export interface GraphNodeType {
  id: string
  neighbors: GraphNodeType[]
}

export interface GraphType {
  id: string
  nodes: GraphNodeType[]
}

export class GraphStorage extends Storage<GraphType> {
  constructor(db: Level) {
    super(db, 'graphs')
  }
}
