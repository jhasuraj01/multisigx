import type { Level } from 'level'
import { KeyValueStorage } from '../core'

export class WalletConnectStorage extends KeyValueStorage<any> {
  constructor(db: Level) {
    super(db, 'walletconnect')
  }
}
