import { Graph } from '@jhasuraj01/composer'
import { Args, Command } from '@oclif/core'

export default class DeleteEdge extends Command {
  static override args = {
    node1: Args.string({ description: 'ID of the first node', required: true }),
    node2: Args.string({ description: 'ID of the second node', required: true })
  }

  static override description = 'Delete an edge between two nodes in the graph'

  static override examples = [
    '<%= config.bin %> <%= command.id %> 1 2',
    '<%= config.bin %> <%= command.id %> 3 4'
  ]

  public async run(): Promise<void> {
    const { args } = await this.parse(DeleteEdge)

    const graph = new Graph<number>()

    // Find nodes with the given IDs
    const node1 = graph.nodes.find((node) => node.id === Number(args.node1))
    const node2 = graph.nodes.find((node) => node.id === Number(args.node2))

    if (node1 !== undefined && node2 !== undefined) {
      // Delete the edge between the nodes
      graph.removeEdge(node1, node2)
      this.log(`Edge deleted between nodes ${args.node1} and ${args.node2}`)
    } else {
      this.error(
        'One or both of the specified nodes do not exist in the graph.'
      )
    }

    // Print the updated adjacency list
    this.log('Updated Adjacency List:')
    graph.printAdjacencyList()
  }
}
