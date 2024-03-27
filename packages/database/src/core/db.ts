import { Level } from 'level'
export const db = new Level('data', { valueEncoding: 'json', version: 1 })
