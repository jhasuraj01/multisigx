import { RuleGraph } from '@jhasuraj01/composer'
import { graphStorage } from '@jhasuraj01/database'
import { oneWaySerialize } from '@jhasuraj01/utils'
import { Args, Command, Flags } from '@oclif/core'

export default class CreateGraph extends Command {
  static override aliases = ['create:graph']

  static override args = {
    graph: Args.string({ description: 'graph id', required: false })
  }

  static override description = 'Create new graph'

  static override examples = [
    '<%= config.bin %> <%= command.id %> graph-id -t "Graph Title" -d "Graph Description"',
    '<%= config.bin %> <%= command.id %> graph-id --title="Graph Title" --description="Graph Description"'
  ]

  static override flags = {
    description: Flags.string({
      char: 'd',
      description: 'Description of the Graph',
      required: false
    }),
    title: Flags.string({
      char: 't',
      description: 'Description of the Title',
      required: false
    })
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(CreateGraph)

    try {
      const graph = RuleGraph.create({
        description: flags.description,
        id: args.graph,
        title: flags.title
      })
      await graphStorage.writeOne(graph.export())
      this.log('Graph created')
      this.logJson(oneWaySerialize(graph.export()))
    } catch (error) {
      if (error instanceof Error) {
        this.logToStderr(`${error.name}: ${error.message}`)
      } else if (typeof error === 'string') {
        this.logToStderr(error)
      } else {
        throw error
      }
    }
  }
}
