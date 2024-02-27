import { RuleGraphObject, IRuleGraph, Rule, RuleID } from "@jhasuraj01/interface"

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

export class Graph implements IRuleGraph {

  private graphObject: RuleGraphObject

  constructor(_graphObject: RuleGraphObject) {
    this.graphObject = _graphObject;
  }

  static import(_graph: object): Graph {
    throw new Error('Import Graph is Not Implemented')
  }

  export(): RuleGraphObject {
    return structuredClone(this.graphObject)
  }

  addRule(_rule: Rule): Promise<Rule> {
    this.graphObject.rules[];
    // perform database operation
    return Promise.resolve(_rule)
  }

  removeRule(): Promise<void> {
    throw new Error('Remove Rule is Not Implemented')
  }

  isSafeToConnect(_from: RuleID, _to: RuleID): boolean {
    throw new Error('isSafeToConnect is Not Implemented')
  }

  connectRules(_from: RuleID, _to: RuleID): Promise<void> {
    if (this.isSafeToConnect(_from, _to)) {
      node1.addNeighbor(node2)
    } else {
      throw new Error('Cyclic Edges are not possible.')
    }
  }

  hasPath = (
    fromNode: GraphNode<T>,
    toNode: GraphNode<T>,
    visited: Set<GraphNode<T>> = new Set()
  ): boolean => {
    if (fromNode === toNode) {
      return true
    }
    visited.add(fromNode)
    for (const neighbor of fromNode.neighbors) {
      if (!visited.has(neighbor) && this.hasPath(neighbor, toNode, visited)) {
        return true
      }
    }
    return false
  }

  removeEdge = (node1: GraphNode<T>, node2: GraphNode<T>): void => {
    node1.removeNeighbor(node2)
  }

  printAdjacencyList = (): void => {
    this.nodes.forEach((node) => {
      const neighbors = node.neighbors.map((neighbor) => neighbor.id).join(', ')
      console.log(`${node.id as unknown as string}: ${neighbors}`)
    })
  }
}
