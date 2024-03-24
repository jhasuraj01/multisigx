import { connect } from '@jhasuraj01/walletconnect'
import { Command } from '@oclif/core'

export default class ConnectGraph extends Command {
  static override aliases = ['connect:wallet']

  static override description = 'Connect Wallet'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  public async run(): Promise<void> {
    const provider = await connect()
    this.logJson(provider.session)
    process.exit(0)
  }
}
