import { type Command } from '@oclif/core'

export const handleError = (_this: Command, error: unknown): void => {
  if (error instanceof Error) {
    _this.logToStderr(`${error.name}: ${error.message}`)
  } else if (typeof error === 'string') {
    _this.logToStderr(error)
  } else {
    throw error
  }
}
