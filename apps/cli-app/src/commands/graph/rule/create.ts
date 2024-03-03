import {
  RuleGraph,
  generateAndRule,
  generateAtleastRule,
  generateOrRule,
  generateSignRule
} from '@jhasuraj01/composer'
import { graphStorage } from '@jhasuraj01/database'
import { type LogicRule, type SignRule } from '@jhasuraj01/interface'
import { Args, Command, Flags } from '@oclif/core'

const ruleOptions: Array<LogicRule['type'] | SignRule['type']> = [
  'AND',
  'OR',
  'ATLEAST',
  'SIGN'
]

export default class CreateRule extends Command {
  static override args = {
    name: Args.string({ description: 'Rule Name', required: false })
  }

  static override description = 'Create new rule'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  static override flags = {
    address: Flags.string({
      description: 'Ethereum Address',
      required: true
    }),
    graph: Flags.string({
      description: 'Graph ID',
      required: true
    }),
    type: Flags.string({
      default: 'AND',
      description: 'Description of the Title',
      options: ruleOptions,
      required: false
    })
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(CreateRule)

    try {
      const ruleGraphObject = await graphStorage.findOneById(flags.graph)
      const graph = RuleGraph.import(ruleGraphObject)

      switch (flags.type) {
        case 'AND': {
          graph.addRule(generateAndRule({ name: args.name }))
          break
        }

        case 'OR': {
          graph.addRule(generateOrRule({ name: args.name }))
          break
        }

        case 'ATLEAST': {
          graph.addRule(generateAtleastRule({ name: args.name }))
          break
        }

        case 'SIGN': {
          graph.addRule(
            generateSignRule({ address: flags.address, name: args.name })
          )
          break
        }
      }

      await graphStorage.writeOne(graph.export())
      this.log('Rule Created')
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
