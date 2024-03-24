import { getSession } from '@jhasuraj01/walletconnect'
import { Command } from '@oclif/core'

export default class ConnectGraph extends Command {
  static override aliases = ['session:wallet']

  static override description = 'Connect Wallet'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  public async run(): Promise<void> {
    const session = await getSession()
    if (session) {
      this.logJson(session)
    } else {
      this.log('No session found')
    }

    process.exit(0)
  }
}
