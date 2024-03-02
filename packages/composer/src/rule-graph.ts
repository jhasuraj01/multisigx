import {
  type RuleGraphObject,
  AbstractRuleGraph,
  type Rule,
  type RuleID,
  RuleGraphObjectSchema
} from '@jhasuraj01/interface'

export class RuleGraph extends AbstractRuleGraph {
  private readonly graphObject: RuleGraphObject

  constructor(_graphObject: RuleGraphObject) {
    super()
    this.graphObject = _graphObject
  }

  static override import(_graph: object): RuleGraph {
    const _graphObject = RuleGraphObjectSchema.parse(_graph)
    return new RuleGraph(_graphObject)
  }

  override export(): RuleGraphObject {
    return structuredClone(this.graphObject)
  }

  override addRule(_rule: Rule): this {
    this.graphObject.rules.set(_rule.id, _rule)
    return this
  }

  override removeRule(_id: RuleID): this {
    const ruleToRemove = this.graphObject.rules.get(_id)

    if (ruleToRemove === undefined)
      throw new Error('_id: RuleID is invalid, Rule Not Found')

    if (ruleToRemove.type !== 'END') {
      ruleToRemove.dependents.forEach((_dependentId) => {
        this.disconnectRules(_id, _dependentId)
      })
    }

    if (ruleToRemove.type !== 'START') {
      ruleToRemove.dependsOn.forEach((_dependOnId) => {
        this.disconnectRules(_dependOnId, _id)
      })
    }

    this.graphObject.rules.delete(_id)

    return this
  }

  override isSafeToConnect(_from: RuleID, _to: RuleID): boolean {
    const source = this.graphObject.rules.get(_from)
    const target = this.graphObject.rules.get(_to)

    if (source === undefined)
      throw new Error('_from: RuleID is invalid, Rule Not Found')
    if (target === undefined)
      throw new Error('_to: RuleID is invalid, Rule Not Found')

    if (source.type === 'END')
      throw new Error('_to: RuleID is invalid, EndRule can not have dependents')
    if (target.type === 'START')
      throw new Error(
        '_from: RuleID is invalid, StartRule can not have dependencies'
      )

    return (
      source.type === 'START' ||
      target.type === 'END' ||
      !this.hasPath(_to, _from)
    )
  }

  override connectRules(_from: RuleID, _to: RuleID): this {
    if (!this.isSafeToConnect(_from, _to))
      throw new Error('Cyclic Edges are not possible.')

    const source = this.graphObject.rules.get(_from)
    const target = this.graphObject.rules.get(_to)

    if (source === undefined)
      throw new Error('_from: RuleID is invalid, Rule Not Found')
    if (target === undefined)
      throw new Error('_to: RuleID is invalid, Rule Not Found')

    if (source.type === 'END')
      throw new Error('_to: RuleID is invalid, EndRule can not have dependents')
    if (target.type === 'START')
      throw new Error(
        '_from: RuleID is invalid, StartRule can not have dependencies'
      )

    source.dependents.add(_to)
    target.dependsOn.add(_from)

    return this
  }

  hasPath = (
    _from: RuleID,
    _to: RuleID,
    visited: Set<RuleID> = new Set()
  ): boolean => {
    if (_from === _to) return true

    visited.add(_from)

    const source = this.graphObject.rules.get(_from)

    if (source === undefined)
      throw new Error('_from: RuleID is invalid, Rule Not Found')

    if (source.type === 'END') return false

    for (const _dependent of source.dependents) {
      if (!visited.has(_dependent) && this.hasPath(_dependent, _to, visited)) {
        return true
      }
    }

    return false
  }

  override disconnectRules(_from: RuleID, _to: RuleID): this {
    const source = this.graphObject.rules.get(_from)
    const target = this.graphObject.rules.get(_to)

    if (source === undefined)
      throw new Error('_from: RuleID is invalid, Rule Not Found')
    if (target === undefined)
      throw new Error('_to: RuleID is invalid, Rule Not Found')

    if (source.type === 'END')
      throw new Error(
        '_to: RuleID is invalid, EndRule does not have dependents'
      )
    if (target.type === 'START')
      throw new Error(
        '_from: RuleID is invalid, StartRule does not have dependencies'
      )

    source.dependents.delete(_from)
    target.dependsOn.delete(_to)

    return this
  }

  /**
   * @todo Implement for UI
   */
  override findAllSafeTargets(_from: RuleID): RuleID[] {
    throw new Error('findAllSafeTargets is not implemented')
  }

  /**
   * @todo Implement for UI
   */
  override findAllCyclicPaths(): RuleID[][] {
    throw new Error('findAllCyclicPaths is not implemented')
  }

  override isValidDirectedAcyclicGraph(): boolean {
    throw new Error('findAllCyclicPaths is not implemented')
  }

  override getRule(_id: RuleID): Rule {
    throw new Error('findAllCyclicPaths is not implemented')
  }

  override getAllRules(): Rule[] {
    throw new Error('findAllCyclicPaths is not implemented')
  }

  override getDependents(_id: RuleID): Rule[] {
    throw new Error('findAllCyclicPaths is not implemented')
  }

  override getDependencies(_id: RuleID): Rule[] {
    throw new Error('findAllCyclicPaths is not implemented')
  }

  // printAdjacencyList = (): void => {
  //   this.nodes.forEach((node) => {
  //     const neighbors = node.neighbors.map((neighbor) => neighbor.id).join(', ')
  //     console.log(`${node.id as unknown as string}: ${neighbors}`)
  //   })
  // }
}
