import { RuleGraph } from '@jhasuraj01/composer'
import { graphStorage } from '@jhasuraj01/database'
import { Command, Flags } from '@oclif/core'

export default class DisconnectRules extends Command {
  static override aliases = ['disconnect:rules']

  static override description = 'Disconnect two rules within graph'

  static override examples = [
    '<%= config.bin %> <%= command.id %> --graph=graph-id --from=src-rule-id --to=target-rule-id',
    '<%= config.bin %> <%= command.id %> -g graph-id -f src-rule-id -t target-rule-id'
  ]

  static override flags = {
    from: Flags.string({
      char: 'f',
      description: 'id of the source rule',
      required: true
    }),
    graph: Flags.string({
      char: 'g',
      description: 'graph id',
      required: true
    }),
    to: Flags.string({
      char: 't',
      description: 'id of the target rule',
      required: true
    })
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(DisconnectRules)

    try {
      const graphObject = await graphStorage.findOneById(flags.graph)
      const graph = RuleGraph.import(graphObject)

      graph.disconnectRules(flags.from, flags.to)
      await graphStorage.writeOne(graph.export())

      this.log(
        `deleted connection from rule(${flags.from}) to rule(${flags.to})`
      )
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
