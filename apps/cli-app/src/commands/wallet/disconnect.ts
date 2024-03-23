import { disconnect } from '@jhasuraj01/walletconnect'
import { Command } from '@oclif/core'

export default class DisconnectWallet extends Command {
  static override aliases = ['disconnect:wallet']

  static override description = 'Disconnect Wallet'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    await disconnect();
    process.exit(0);
  }
}
