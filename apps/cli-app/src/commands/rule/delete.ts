import { RuleGraph } from '@jhasuraj01/composer'
import { graphStorage } from '@jhasuraj01/database'
import { Args, Command, Flags } from '@oclif/core'

export default class DeleteRule extends Command {
  static override aliases = ['delete:rule']

  static override args = {
    ruleId: Args.string({ description: 'rule id', required: true })
  }

  static override description = 'delete rule from graph'

  static override examples = [
    '<%= config.bin %> <%= command.id %> rule-id --graph=graph-id',
    '<%= config.bin %> <%= command.id %> rule-id -g graph-id'
  ]

  static override flags = {
    graph: Flags.string({
      char: 'g',
      description: 'graph id',
      required: true
    })
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(DeleteRule)

    try {
      const graphObject = await graphStorage.findOneById(flags.graph)
      const graph = RuleGraph.import(graphObject)

      graph.removeRule(args.ruleId)
      await graphStorage.writeOne(graph.export())

      this.log('rule deleted successfully!')
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
