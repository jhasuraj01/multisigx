import { RuleGraph } from '@jhasuraj01/composer'
import { graphStorage } from '@jhasuraj01/database'
import { Args, Command, Flags } from '@oclif/core'

export default class CreateEdge extends Command {
  static override args = {
    graphId: Args.string({ description: 'Graph Id', required: true })
  }

  static override description = 'Create an edge between two nodes in the graph'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
    description: Flags.string({
      description: 'Description of the Graph',
      required: false
    }),
    title: Flags.string({
      description: 'Description of the Title',
      required: false
    })
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(CreateEdge)

    try {
      const graph = RuleGraph.create({
        description: flags.description,
        id: args.graphId,
        title: flags.title
      })
      await graphStorage.writeOne(graph.export())
      this.log('Graph created')
      this.logJson(graph.export())
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
