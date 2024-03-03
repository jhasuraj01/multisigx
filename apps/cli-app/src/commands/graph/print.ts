import { graphStorage } from '@jhasuraj01/database'
import { Args, Command } from '@oclif/core'

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
