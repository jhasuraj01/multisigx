import { Graph } from '@jhasuraj01/composer'
import { Args, Command } from '@oclif/core'

export default class CreateEdge extends Command {
  static override args = {
    node1: Args.string({ description: 'ID of the first node', required: true }),
    node2: Args.string({ description: 'ID of the second node', required: true })
  }

  static override description = 'Create an edge between two nodes in the graph'

  static override examples = [
    '<%= config.bin %> <%= command.id %> 1 2',
    '<%= config.bin %> <%= command.id %> 3 4'
  ]

  public async run(): Promise<void> {
    const { args } = await this.parse(CreateEdge)

    const graph = new Graph<number>()

    // Find or create nodes with the given IDs
    const node1 =
      graph.nodes.find((node) => node.id === Number(args.node1)) ??
      graph.addNode(Number(args.node1))
    const node2 =
      graph.nodes.find((node) => node.id === Number(args.node2)) ??
      graph.addNode(Number(args.node2))

    // Create an edge between the nodes
    graph.addEdge(node1, node2)

    this.log(`Edge created between nodes ${args.node1} and ${args.node2}`)

    // Print the updated adjacency list
    this.log('Updated Adjacency List:')
    graph.printAdjacencyList()
  }
}
