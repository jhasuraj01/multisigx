import { graphStorage } from '@jhasuraj01/database'
import { oneWaySerialize } from '@jhasuraj01/utils'
import { Args, Command } from '@oclif/core'

export default class PrintGraph extends Command {
  static override aliases = ['print:graph']

  static override args = {
    graph: Args.string({ description: 'graph id', required: true })
  }

  static override description = 'Print json representation of graph object'

  static override examples = ['<%= config.bin %> <%= command.id %> graph-id']

  public async run(): Promise<void> {
    const { args } = await this.parse(PrintGraph)

    try {
      const ruleGraphObject = await graphStorage.findOneById(args.graph)
      this.logJson(oneWaySerialize(ruleGraphObject))
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
