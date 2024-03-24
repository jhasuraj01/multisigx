import { oneWaySerialize } from '@jhasuraj01/utils'
import { getProvider } from '@jhasuraj01/walletconnect'
import { Command, Flags } from '@oclif/core'
import { Web3 } from 'web3'

export default class SendTransaction extends Command {
  static override aliases = ['connect:wallet']

  static override description = 'Connect Wallet'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  static override flags = {
    // from: Flags.string({
    //   char: 'f',
    //   description: 'id of the source rule',
    //   required: true
    // }),
    to: Flags.string({
      char: 't',
      description: 'id of the target rule',
      required: true
    })
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(SendTransaction)
    const provider = await getProvider();
    const web3 = new Web3(provider)

    const accounts = await web3.eth.getAccounts();
    this.logJson({ accounts })

    if(accounts.length === 0) {
      this.toErrorJson('No accounts found in the session')
      process.exit(1)
    }

    this.log('Sending transaction')
    const receipt = await web3.eth.sendTransaction({
      chain: 'sepolia',
      chainId: 11_155_111,
      from: accounts[0],
      gas: 30_000,
      to: flags.to,
      value: web3.utils.toWei('0.00000000001', 'ether'),
    });

    this.logJson(oneWaySerialize(receipt))

    process.exit(0)
  }
}
