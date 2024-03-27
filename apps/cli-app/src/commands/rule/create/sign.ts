import {
  RuleGraph,
  generateAndRule,
  generateAtleastRule,
  generateOrRule,
  generateSignRule
} from '@jhasuraj01/composer'
import { graphStorage } from '@jhasuraj01/database'
import { Args, Command, Flags } from '@oclif/core'

export default class CreateSignRule extends Command {
  static override aliases = ['create:sign-rule']

  static override args = {
    ruleId: Args.string({ description: 'rule id', required: false })
  }

  static override description = 'Create new `sign` rule'

  static override examples = [
    '<%= config.bin %> <%= command.id %> --address=eth-address --graph=graph-id',
    '<%= config.bin %> <%= command.id %> rule-id --address=eth-address --graph=graph-id',
    '<%= config.bin %> <%= command.id %> rule-id --address=eth-address --graph=graph-id  --logic=and',
    '<%= config.bin %> <%= command.id %> rule-id --address=eth-address --graph=graph-id  --logic=and --name="Rule Name"'
  ]

  static override flags = {
    address: Flags.string({
      char: 'a',
      description: 'ethereum address',
      required: true
    }),
    graph: Flags.string({
      char: 'g',
      description: 'graph id',
      required: true
    }),
    logic: Flags.string({
      char: 'l',
      default: 'and',
      description: 'internal logic of the rule',
      options: ['and', 'or', 'atleast'],
      required: false
    }),
    name: Flags.string({
      char: 'n',
      description: 'rule name',
      required: false
    })
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(CreateSignRule)

    try {
      const ruleGraphObject = await graphStorage.findOneById(flags.graph)
      const graph = RuleGraph.import(ruleGraphObject)

      let internalLogicRule = null
      switch (flags.logic) {
        case 'and': {
          internalLogicRule = generateAndRule()

          break
        }

        case 'or': {
          internalLogicRule = generateOrRule()

          break
        }

        case 'atleast': {
          internalLogicRule = generateAtleastRule()

          break
        }

        default: {
          throw new Error('invalid internal logic')
        }
      }

      const rule = generateSignRule({
        address: flags.address,
        id: args.ruleId,
        internalLogic: internalLogicRule,
        name: flags.name
      })

      graph.addRule(rule)
      await graphStorage.writeOne(graph.export())

      this.log('sign rule created')
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
