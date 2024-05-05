import { oneWaySerialize } from '@jhasuraj01/utils'
import { getProvider } from '@jhasuraj01/walletconnect'
import { Command, Flags } from '@oclif/core'
import { Web3 } from 'web3'

const contractAbi = [
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
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'applicationId',
        type: 'string'
      }
    ],
    name: 'createApplication',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'applicationId',
        type: 'string'
      }
    ],
    name: 'getApplication',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'id',
            type: 'string'
          },
          {
            internalType: 'int256',
            name: 'requiredApprovals',
            type: 'int256'
          },
          {
            internalType: 'int256',
            name: 'requiredRejections',
            type: 'int256'
          },
          {
            internalType: 'enum GraphContract.NodeStatus',
            name: 'nodeStatus',
            type: 'uint8'
          }
        ],
        internalType: 'struct GraphContract.DynamicNodeData[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'applicationId',
        type: 'string'
      }
    ],
    name: 'getWorkflowStatus',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'applicationId',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'ruleId',
        type: 'string'
      }
    ],
    name: 'reject',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'applicationId',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'ruleId',
        type: 'string'
      }
    ],
    name: 'sign',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

export default class SignRuleId extends Command {
  static override description =
    'Sign rule in an application of a ruleGraph contract'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  static override flags = {
    applicationId: Flags.string({
      char: 'i',
      description: 'ID of the application',
      required: true
    }),
    contractAddress: Flags.string({
      char: 'c',
      description: 'Address of the contract to interact with',
      required: true
    }),
    ruleId: Flags.string({
      char: 'r',
      description: 'ID of the rule to sign',
      required: true
    })
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(SignRuleId)

    try {
      const provider = await getProvider()
      const web3 = new Web3(provider)

      const accounts = await web3.eth.getAccounts()

      if (accounts.length === 0) {
        this.toErrorJson('No accounts found in the session')
        this.exit(1)
      }

      const graphContract = new web3.eth.Contract(
        contractAbi,
        flags.contractAddress
      )

      this.log(
        'Signing rule with ID ' +
          flags.ruleId +
          ' in application ' +
          flags.applicationId +
          ' of the smart contract at address ' +
          flags.contractAddress +
          ' using wallet address: ' +
          accounts[0] +
          '\n'
      )

      await graphContract.methods['sign']?.(
        flags.applicationId,
        flags.ruleId
      ).call()

      this.log('Authorize transaction from wallet ' + accounts[0] + '\n')

      const receipt = await graphContract.methods['sign']?.(
        flags.applicationId,
        flags.ruleId
      ).send({ from: accounts[0] })

      this.log('Rule ID ' + flags.ruleId + ' signed successfully\n')

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
