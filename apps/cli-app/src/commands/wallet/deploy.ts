import { oneWaySerialize } from '@jhasuraj01/utils'
import { getProvider } from '@jhasuraj01/walletconnect'
import { Command } from '@oclif/core'
import { Web3 } from 'web3'

/**
 * Smart Contract Code
 * ```
 * // SPDX-License-Identifier: GPL-3.0
 *
 * pragma solidity >=0.8.2 <0.9.0;
 *
 * contract SmartContract {
 *     address owner;
 *     constructor(address _owner) {
 *         owner = _owner;
 *     }
 *
 *     function getOwner() public view returns (address) {
 *         return owner;
 *     }
 * }
 *
 * contract SmartContractFactory {
 *     function build() public returns (address) {
 *         SmartContract home = new SmartContract(msg.sender);
 *         return address(home);
 *     }
 * }
 * ```
 */

export default class DeploySmartContract extends Command {
  static override aliases = ['deploy']

  static override description = 'Connect Wallet'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  public async run(): Promise<void> {
    const provider = await getProvider()
    const web3 = new Web3(provider)

    const accounts = await web3.eth.getAccounts()
    this.logJson({ accounts })

    if (accounts.length === 0) {
      this.toErrorJson('No accounts found in the session')
      this.exit(1)
    }

    const contract = new web3.eth.Contract([
      {
        inputs: [],
        name: 'build',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address'
          }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ])
    // contract.options.address = '0x48EdD28C159AffbBe92322B1d4773a7Fb6118a55'
    contract.options.address = '0x54f022cb1c205b43547f3A5FE31033A96Dc527D2'

    this.log('Sending transaction')

    const result = await contract.methods['build()']?.().send({
      from: accounts[0]
    })

    this.logJson(oneWaySerialize(result))

    this.exit(0)
  }
}
