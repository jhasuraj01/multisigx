import {
  RuleGraphObject,
  AbstractRuleGraph,
  Rule,
  RuleID,
  RuleGraphObjectSchema
} from '@jhasuraj01/interface'

export class GraphNode<T> {
  id: T
  neighbors: Array<GraphNode<T>>

  constructor(id: T) {
    this.id = id
    this.neighbors = []
  }

  addNeighbor = (neighbor: GraphNode<T>): void => {
    this.neighbors.push(neighbor)
  }

  removeNeighbor = (neighbor: GraphNode<T>): void => {
    this.neighbors = this.neighbors.filter((node) => node !== neighbor)
  }

  updateValue = (newValue: T): void => {
    this.id = newValue
  }
}

export class RuleGraph extends AbstractRuleGraph {
  private graphObject: RuleGraphObject

  constructor(_graphObject: RuleGraphObject) {
    super()
    this.graphObject = _graphObject
  }

  static override import(_graph: object): RuleGraph {
    const _graphObject = RuleGraphObjectSchema.parse(_graph);
    return new RuleGraph(_graphObject)
  }

  override export(): RuleGraphObject {
    return structuredClone(this.graphObject)
  }

  override addRule(_rule: Rule): RuleGraph {
    this.graphObject.rules[_rule.id] = _rule
    return this
  }

  override removeRule(_id: RuleID): RuleGraph {
    throw new Error('Remove Rule is Not Implemented')
  }

  override isSafeToConnect(_from: RuleID, _to: RuleID): boolean {
    throw new Error('isSafeToConnect is Not Implemented')
  }

  override connectRules(_from: RuleID, _to: RuleID): RuleGraph {

    if(!this.isSafeToConnect(_from, _to))
      throw new Error('Cyclic Edges are not possible.')

    const source = this.graphObject.rules[_from]
    const target = this.graphObject.rules[_to]

    if(source === undefined) throw new Error('_from: RuleID is invalid, Rule Not Found')
    if(target === undefined) throw new Error('_to: RuleID is invalid, Rule Not Found')

    if(source.type === 'END') throw new Error('_to: RuleID is invalid, EndRule can not have dependents')
    if(target.type === 'START') throw new Error('_from: RuleID is invalid, StartRule can not have dependencies')

    source.dependents.add(_to)
    target.dependsOn.add(_from)

    this.graphObject.rules[_from] = source
    this.graphObject.rules[_to] = target

    return this;
  }

  // hasPath = (
  //   fromNode: GraphNode<T>,
  //   toNode: GraphNode<T>,
  //   visited: Set<GraphNode<T>> = new Set()
  // ): boolean => {
  //   if (fromNode === toNode) {
  //     return true
  //   }
  //   visited.add(fromNode)
  //   for (const neighbor of fromNode.neighbors) {
  //     if (!visited.has(neighbor) && this.hasPath(neighbor, toNode, visited)) {
  //       return true
  //     }
  //   }
  //   return false
  // }

  override disconnectRules(_from: RuleID, _to: RuleID): RuleGraph {
    throw new Error('disconnectRules is not implemented')
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
