import { compile } from '@jhasuraj01/composer'
import { graphStorage } from '@jhasuraj01/database'
import { Args, Command } from '@oclif/core'

export default class PrintGraph extends Command {
  static override args = {
    graph: Args.string({ description: 'graph id', required: true })
  }

  static override description = 'Print array representation of graph object'

  static override examples = ['<%= config.bin %> <%= command.id %> graph-id']

  public async run(): Promise<void> {
    const { args } = await this.parse(PrintGraph)

    try {
      const ruleGraphObject = await graphStorage.findOneById(args.graph)

      const {
        addressArray,
        dependentsArray,
        dependsOnArray,
        ids,
        internalLogicArray,
        names,
        thresholdArray,
        types
      } = compile(ruleGraphObject)

      console.log(ids)
      console.log(names)
      console.log(dependentsArray)
      console.log(dependsOnArray)
      console.log(types)
      console.log(internalLogicArray)
      console.log(addressArray)
      console.log(thresholdArray)
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
