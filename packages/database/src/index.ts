import { GraphStorage } from './stores';
import { db } from './core';

export const graphStorage = new GraphStorage(db);