import { graphStorage } from '@jhasuraj01/database'
import { Args, Command } from '@oclif/core'
import { handleError } from 'src/utils/index.js'

export default class PrintGraph extends Command {
  static override args = {
    graphId: Args.string({ description: 'Graph Id', required: true })
  }

  static override description =
    'Prints the adjacency list for a simple graph with given nodes'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  public async run(): Promise<void> {
    const { args } = await this.parse(PrintGraph)

    try {
      const graph = await graphStorage.findOneById(args.graphId)
      this.logJson(graph)
    } catch (error) {
      handleError(this, error)
    }

    // Create an instance of the Graph class
    // const graph = new Graph<number>()

    // // Add nodes and edges
    // const node1 = graph.addNode(1)
    // const node2 = graph.addNode(2)
    // graph.addEdge(node1, node2)

    // graph.printAdjacencyList()

    // await Promise.resolve() // hack
  }
}
