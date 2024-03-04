import { RuleGraph, generateAndRule } from '@jhasuraj01/composer'
import { graphStorage } from '@jhasuraj01/database'
import { Args, Command, Flags } from '@oclif/core'

export default class CreateAndRule extends Command {
  static override aliases = ['create:and-rule']

  static override args = {
    ruleId: Args.string({ description: 'rule id', required: false })
  }

  static override description = 'Create new `and` rule'

  static override examples = [
    '<%= config.bin %> <%= command.id %> --graph=graph-id',
    '<%= config.bin %> <%= command.id %> rule-id --graph=graph-id',
    '<%= config.bin %> <%= command.id %> rule-id --name="Rule Name" --graph=graph-id'
  ]

  static override flags = {
    graph: Flags.string({
      char: 'g',
      description: 'graph id',
      required: true
    }),
    name: Flags.string({
      char: 'n',
      description: 'rule name',
      required: false
    })
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(CreateAndRule)

    try {
      const ruleGraphObject = await graphStorage.findOneById(flags.graph)
      const graph = RuleGraph.import(ruleGraphObject)

      const rule = generateAndRule({
        id: args.ruleId,
        name: flags.name
      })

      graph.addRule(rule)
      await graphStorage.writeOne(graph.export())

      this.log('and rule created')
      this.logJson(rule)
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