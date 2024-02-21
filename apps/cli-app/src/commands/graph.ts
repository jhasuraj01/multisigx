import { Graph } from '@jhasuraj01/composer'
import { Command } from '@oclif/core'

export default class GraphCommand extends Command {
  public async run(): Promise<void> {
    const graph = new Graph<number>()

    const node1 = graph.addNode(1)
    const node2 = graph.addNode(2)
    const node3 = graph.addNode(3)
    const node4 = graph.addNode(4)
    const node6 = graph.addNode(6)
    const node7 = graph.addNode(7)
    const node8 = graph.addNode(8)

    graph.addEdge(node1, node2)
    graph.addEdge(node1, node3)
    graph.addEdge(node2, node4)
    graph.addEdge(node1, node6)
    graph.addEdge(node2, node6)
    graph.addEdge(node7, node8)

    node3.updateValue(5)

    graph.printAdjacencyList()

    // Serialize the graph instance to JSON string
    const serializedGraph: string = JSON.stringify(graph)

    // When retrieving the serialized graph from the database
    const retrievedGraph: Graph<number> = JSON.parse(
      serializedGraph
    ) as Graph<number>

    // Deserialize the serialized graph back into an instance of Graph class
    const deserializedGraph: Graph<number> = Object.assign(
      new Graph<number>(),
      retrievedGraph
    )

    // Now you can access the methods of the deserialized graph instance
    deserializedGraph.printAdjacencyList()

    await Promise.resolve() // hack
  }
}
