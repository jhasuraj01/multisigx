import { type RuleGraphObject } from '@jhasuraj01/interface'
import { Storage } from '../core'

export class GraphStorage extends Storage<RuleGraphObject> {
  constructor() {
    super('graphs')
  }
}
