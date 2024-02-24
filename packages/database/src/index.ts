import { Level } from 'level';
import { GraphStorage } from './stores';

const db = new Level('data', { valueEncoding: 'json', version: 1 })

export const graphStorage = new GraphStorage(db);