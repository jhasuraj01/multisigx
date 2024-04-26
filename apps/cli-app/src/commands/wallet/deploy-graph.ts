import { graphStorage } from '@jhasuraj01/database'
import { getProvider } from '@jhasuraj01/walletconnect'
import { Command, Flags } from '@oclif/core'
import { Web3 } from 'web3'

const factoryAbi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
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
        internalType: 'string[]',
        name: 'addressArray',
        type: 'string[]'
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
const factoryAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'

export default class DeployGraphContract extends Command {
  static override aliases = ['deployGraph']

  static override description = 'Deploy ruleGraph'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  static override flags = {
    graph: Flags.string({
      char: 'g',
      description: 'graph id',
      required: true
    })
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(DeployGraphContract)

    try {
      const ruleGraph = await graphStorage.findOneById(flags.graph)
      const ids: string[] = []
      const names: string[] = []
      const dependentsArray: string[][] = []
      const dependsOnArray: string[][] = []
      const types: string[] = []
      const internalLogicArray: string[] = []
      const addressArray: string[] = []
      const thresholdArray: number[] = []

      for (const [, rule] of ruleGraph.rules) {
        const id: string = 'id' in rule ? rule.id : ''
        const name: string = 'name' in rule ? rule.name : ''
        const dependents: string[] =
          'dependents' in rule ? [...rule.dependents] : []
        const dependsOn: string[] =
          'dependsOn' in rule ? [...rule.dependsOn] : []
        const type: string = 'type' in rule ? rule.type : ''
        const internalLogicType: string =
          'internalLogic' in rule ? rule.internalLogic.type : ''
        const address: string = 'address' in rule ? rule.address : ''

        let threshold = -1

        switch (type) {
          case 'SIGN': {
            if (internalLogicType === 'AND') threshold = dependsOn.length
            else if (internalLogicType === 'OR') threshold = 1
            else if ('internalLogic' in rule && 'count' in rule.internalLogic)
              threshold = rule.internalLogic.count
            break
          }

          case 'END': {
            if (internalLogicType === 'AND') threshold = dependsOn.length
            else if (internalLogicType === 'OR') threshold = 1
            else if ('internalLogic' in rule && 'count' in rule.internalLogic)
              threshold = rule.internalLogic.count
            break
          }

          case 'AND': {
            threshold = dependsOn.length
            break
          }

          case 'OR': {
            threshold = 1
            break
          }

          case 'ATLEAST': {
            if ('count' in rule) threshold = rule.count
            break
          }

          case 'START': {
            threshold = 0
            break
          }

          default: {
            throw new Error('Invalid Rule')
          }
        }

        ids.push(id)
        names.push(name)
        dependentsArray.push(dependents)
        dependsOnArray.push(dependsOn)
        types.push(type)
        internalLogicArray.push(internalLogicType)
        addressArray.push(address)
        thresholdArray.push(threshold)
      }

      const provider = await getProvider()
      const web3 = new Web3(provider)

      const accounts = await web3.eth.getAccounts()

      if (accounts.length === 0) {
        this.toErrorJson('No accounts found in the session')
        this.exit(1)
      }

      const factoryContract = new web3.eth.Contract(factoryAbi, factoryAddress)
      // contract.options.address = '0x48EdD28C159AffbBe92322B1d4773a7Fb6118a55'
      // contract.options.address = '0x54f022cb1c205b43547f3A5FE31033A96Dc527D2'
      // contract.options.address = '0x81EC7e57E0a1E3Ff029C41F03a57A754d2f8Ac33'

      this.log('Sending transaction to wallet ' + accounts[0] + '\n')

      const graphContract = await factoryContract.methods['build']?.(
        ids,
        names,
        dependentsArray,
        dependsOnArray,
        types,
        internalLogicArray,
        addressArray,
        thresholdArray
      ).send({ from: accounts[0], gas: '2000000' })

      this.log('Graph contract deployed\n')

      this.log(
        'Graph contract address : ' + (graphContract?.contractAddress ?? 'N/A')
      )
      this.log(
        'Graph contract transaction hash : ' +
          (graphContract?.transactionHash ?? 'N/A')
      )
      this.log(
        'Graph contract block number : ' + (graphContract?.blockNumber ?? 'N/A')
      )
      this.log(
        'Graph contract block hash :' + (graphContract?.blockHash ?? 'N/A')
      )
      this.log('Graph contract gas used :' + (graphContract?.gasUsed ?? 'N/A'))
      this.log(
        'Graph contract cumulative gas used :' +
          (graphContract?.cumulativeGasUsed ?? 'N/A')
      )
      this.log('Graph contract status :' + (graphContract?.status ?? 'N/A'))
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
