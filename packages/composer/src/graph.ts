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

export class Graph<T> {
  nodes: Array<GraphNode<T>>

  constructor() {
    this.nodes = []
  }

  addNode = (id: T): GraphNode<T> => {
    const node = new GraphNode(id)
    this.nodes.push(node)
    return node
  }

  addEdge = (node1: GraphNode<T>, node2: GraphNode<T>): void => {
    if (!this.hasPath(node2, node1)) {
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
