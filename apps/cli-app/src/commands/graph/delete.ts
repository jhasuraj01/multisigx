import { graphStorage } from '@jhasuraj01/database'
import { Args, Command } from '@oclif/core'

export default class DeleteGraph extends Command {
  static override aliases = ['delete:graph']

  static override args = {
    graph: Args.string({ description: 'graph id', required: true })
  }

  static override description = 'Delete the graph from database'

  static override examples = ['<%= config.bin %> <%= command.id %> graph-id']

  public async run(): Promise<void> {
    const { args } = await this.parse(DeleteGraph)

    try {
      await graphStorage.deleteOneById(args.graph)
      this.log('Graph deleted')
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
