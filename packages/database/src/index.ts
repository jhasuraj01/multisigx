import { GraphStorage, WalletConnectStorage } from './stores';
import { db } from './core';

export const graphStorage = new GraphStorage(db);
export const walletConnectStorage = new WalletConnectStorage(db);