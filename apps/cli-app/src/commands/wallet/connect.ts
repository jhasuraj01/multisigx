import { getProvider } from '@jhasuraj01/walletconnect'
import { Command } from '@oclif/core'

export default class CreateGraph extends Command {
  static override aliases = ['connect:wallet']

  static override description = 'Create new graph'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    const session = await getProvider();
    this.logJson(session);
  }
}
