import { Command, Flags } from '@oclif/core'

const apiKey = '8IUTUTPN6PWHAT7K8EFIII69VNZIHDKTKW'

interface Transaction {
  blockNumber: string
  contractAddress: string
  errCode: string
  from: string
  gas: string
  gasUsed: string
  input: string
  isError: string
  timeStamp: string
  to: string
  type: string
  value: string
}

interface ApiResponse {
  message: string
  result: Transaction[]
  status: string
}

export default class getDeployedContractAddress extends Command {
  static override description = 'Get deployed contract address'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  static override flags = {
    txHash: Flags.string({
      description: 'Transaction hash of the contract deployment',
      required: true
    })
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(getDeployedContractAddress)

    try {
      const apiUrl = `https://api-sepolia.etherscan.io/api?module=account&action=txlistinternal&txhash=${flags.txHash}&apikey=${apiKey}`

      this.log('Getting Deployed Contract address\n')

      const data: ApiResponse = await this.sendGetRequest(apiUrl)

      if (data.status === '0') {
        throw new Error(data.message)
      }

      if (data.result.length === 0) {
        this.toErrorJson('No deployed contract address found')
        this.exit(1)
      }

      console.log(
        'Contract Address: ' + (data.result[0]?.contractAddress ?? 'N/A')
      )
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

  private async sendGetRequest(url: string): Promise<ApiResponse> {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return (await response.json()) as ApiResponse
    } catch (error) {
      console.error('Error sending GET request:', error)
      throw error
    }
  }
}
