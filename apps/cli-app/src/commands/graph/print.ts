import { graphStorage } from '@jhasuraj01/database'
import { oneWaySerialize } from '@jhasuraj01/utils'
import { Args, Command } from '@oclif/core'

export default class PrintGraph extends Command {
  static override args = {
    graphId: Args.string({ description: 'Graph Id', required: true })
  }

  static override description = 'Prints JSON Object of Graph'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  public async run(): Promise<void> {
    const { args } = await this.parse(PrintGraph)

    try {
      const ruleGraphObject = await graphStorage.findOneById(args.graphId)
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
