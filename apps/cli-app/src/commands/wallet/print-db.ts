import { walletConnectStorage } from '@jhasuraj01/database'
import { Command } from '@oclif/core'

export default class ConnectGraph extends Command {
  static override aliases = ['print:walletconnect-db']

  static override description = 'Connect Wallet'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    const entries = await walletConnectStorage.getEntries();
    this.logJson(entries);
  }
}
