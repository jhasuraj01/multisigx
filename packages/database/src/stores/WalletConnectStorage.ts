import { KeyValueStorage } from '../core'

export class WalletConnectStorage extends KeyValueStorage<any> {
  constructor() {
    super('walletconnect')
  }
}
