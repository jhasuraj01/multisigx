import { compile } from '@jhasuraj01/composer'
import { graphStorage } from '@jhasuraj01/database'
import { type RuleGraphObject } from '@jhasuraj01/interface'
import { oneWaySerialize } from '@jhasuraj01/utils'
import { getProvider } from '@jhasuraj01/walletconnect'
import { Command, Flags } from '@oclif/core'
import { Web3 } from 'web3'

const factoryAbi = [
  {
    inputs: [
      {
        internalType: 'string[]',
        name: 'ids',
        type: 'string[]'
      },
      {
        internalType: 'string[]',
        name: 'names',
        type: 'string[]'
      },
      {
        internalType: 'string[][]',
        name: 'dependentsArray',
        type: 'string[][]'
      },
      {
        internalType: 'string[][]',
        name: 'dependsOnArray',
        type: 'string[][]'
      },
      {
        internalType: 'string[]',
        name: 'types',
        type: 'string[]'
      },
      {
        internalType: 'string[]',
        name: 'internalLogicArray',
        type: 'string[]'
      },
      {
        internalType: 'address[]',
        name: 'addressArray',
        type: 'address[]'
      },
      {
        internalType: 'int256[]',
        name: 'thresholdArray',
        type: 'int256[]'
      }
    ],
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
]
const factoryAddress = '0x41abE7a17CD2a27A2E203F5B7Cf3708FD9Bf28E8'

export default class DeployContract extends Command {
  static override description = 'Deploy ruleGraph contract'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  static override flags = {
    graph: Flags.string({
      char: 'g',
      description: 'graph id',
      required: true
    })
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(DeployContract)

    try {
      const ruleGraph: RuleGraphObject = await graphStorage.findOneById(
        flags.graph
      )

      const {
        ids,
        names,
        dependentsArray,
        dependsOnArray,
        types,
        internalLogicArray,
        addressArray,
        thresholdArray
      } = compile(ruleGraph)

      const provider = await getProvider()
      const web3 = new Web3(provider)

      const accounts = await web3.eth.getAccounts()

      if (accounts.length === 0) {
        this.toErrorJson('No accounts found in the session')
        this.exit(1)
      }

      const factoryContract = new web3.eth.Contract(factoryAbi, factoryAddress)

      this.log('Deploying Graph Contract\n')

      await factoryContract.methods['build']?.(
        ids,
        names,
        dependentsArray,
        dependsOnArray,
        types,
        internalLogicArray,
        addressArray,
        thresholdArray
      ).call()

      this.log('Authorize transaction from wallet ' + accounts[0] + '\n')

      const receipt = await factoryContract.methods['build']?.(
        ids,
        names,
        dependentsArray,
        dependsOnArray,
        types,
        internalLogicArray,
        addressArray,
        thresholdArray
      ).send({ from: accounts[0] })

      this.log('Graph contract deployed successfully\n')

      this.log('Transaction Receipt: \n')

      console.log(oneWaySerialize(receipt))
    } catch (error) {
      if (error instanceof Error) {
        this.logToStderr(`${error.name}: ${error.message}`)
      } else if (typeof error === 'string') {
        this.logToStderr(error)
      } else {
        throw error
      }
    }

    this.exit(0)
  }
}
