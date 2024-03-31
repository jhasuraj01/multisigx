import { graphStorage } from '@jhasuraj01/database'
import { Command } from '@oclif/core'

export default class ListGraphs extends Command {
  static override aliases = ['list:graph']

  static override description = 'List all the graphs in the database'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  public async run(): Promise<void> {
    try {
      const graphs = await graphStorage.getAll()
      const printableGraph = graphs.map((graph) => ({
        description: graph.description,
        id: graph.id,
        title: graph.title
      }))
      this.logJson(printableGraph)
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
