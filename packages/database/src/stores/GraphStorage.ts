import { type RuleGraphObject } from '@jhasuraj01/interface'
import type { Level } from 'level'
import { Storage } from '../core'

export class GraphStorage extends Storage<RuleGraphObject> {
  constructor(db: Level) {
    super(db, 'graphs')
  }
}
