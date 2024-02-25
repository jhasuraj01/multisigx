import { Graph } from '@jhasuraj01/composer'
import { Command } from '@oclif/core'

export default class PrintGraph extends Command {
  static override description =
    'Prints the adjacency list for a simple graph with given nodes'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  public async run(): Promise<void> {
    // Create an instance of the Graph class
    const graph = new Graph<number>()

    // Add nodes and edges
    const node1 = graph.addNode(1)
    const node2 = graph.addNode(2)
    graph.addEdge(node1, node2)

    graph.printAdjacencyList()

    await Promise.resolve() // hack
  }
}
