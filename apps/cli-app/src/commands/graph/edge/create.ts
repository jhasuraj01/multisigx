import { RuleGraph } from '@jhasuraj01/composer'
import { graphStorage } from '@jhasuraj01/database'
import { Args, Command, Flags } from '@oclif/core'

export default class CreateEdge extends Command {
  static override args = {
    graphId: Args.string({ description: 'Graph Id', required: true })
  }

  static override description = 'Create an edge between two nodes in the graph'

  static override examples = [
    '<%= config.bin %> <%= command.id %> graphid -f 1 -t 2',
    '<%= config.bin %> <%= command.id %> graphid -f 1 -t 2'
  ]

  static override flags = {
    from: Flags.string({
      char: 'f',
      description: 'ID of the starting node',
      required: true
    }),
    to: Flags.string({
      char: 't',
      description: 'ID of the ending node',
      required: true
    })
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(CreateEdge)

    try {
      const graphObject = await graphStorage.findOneById(args.graphId)
      const graph = RuleGraph.import(graphObject)
      graph.connectRules(flags.from, flags.to)
      await graphStorage.writeOne(graph.export())
      this.log(`Edge created between nodes ${flags.from} and ${flags.to}`)
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
