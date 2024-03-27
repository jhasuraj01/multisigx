type KeyType = string | number | symbol

export const serialize = (data: unknown): unknown => {
  if (typeof data === 'object') {
    if (data === null) {
      return data
    }
    if (data instanceof Map) {
      return {
        __custom: true,
        __type: 'Map',
        __data: Array.from(data).map(([key, value]) => [
          serialize(key),
          serialize(value)
        ])
      }
    }
    if (data instanceof Set) {
      return {
        __custom: true,
        __type: 'Set',
        __data: Array.from(data).map(serialize)
      }
    }
    if (data instanceof Date) {
      return {
        __custom: true,
        __type: 'Date',
        __data: data.toISOString()
      }
    }
    if (Array.isArray(data)) {
      return data.map(serialize)
    }
    const result: Record<KeyType, unknown> = {}
    for (const [key, value] of Object.entries(data) as Array<
      [KeyType, unknown]
    >) {
      result[key] = serialize(value)
    }
    return result
  }

  if (typeof data === 'bigint') {
    return {
      __custom: true,
      __type: 'BigInt',
      __data: data.toString()
    }
  }

  if (typeof data === 'symbol') {
    return {
      __custom: true,
      __type: 'Symbol',
      __data: data.description
    }
  }

  if (
    typeof data === 'number' ||
    typeof data === 'string' ||
    typeof data === 'boolean'
  ) {
    return data
  }

  return undefined
}

export const oneWaySerialize = (data: unknown): unknown => {
  if (typeof data === 'object') {
    if (data === null) {
      return data
    }
    if (data instanceof Map) {
      return Object.fromEntries(
        Array.from(data).map(([key, value]: [KeyType, unknown]) => [
          oneWaySerialize(key),
          oneWaySerialize(value)
        ])
      )
    }
    if (data instanceof Set) {
      return Array.from(data).map(oneWaySerialize)
    }
    if (data instanceof Date) {
      return data.toISOString()
    }
    if (Array.isArray(data)) {
      return data.map(oneWaySerialize)
    }
    const result: Record<KeyType, unknown> = {}
    for (const [key, value] of Object.entries(data) as Array<
      [KeyType, unknown]
    >) {
      result[key] = oneWaySerialize(value)
    }
    return result
  }

  if (typeof data === 'bigint' || typeof data === 'symbol') {
    return data.toString()
  }

  if (
    typeof data === 'number' ||
    typeof data === 'string' ||
    typeof data === 'boolean'
  ) {
    return data
  }

  return undefined
}

export const deserialize = (data: unknown): unknown => {
  if (typeof data === 'object') {
    if (data === null) {
      return data
    }
    if ('__custom' in data && '__type' in data && '__data' in data) {
      if (data.__type === 'Map' && Array.isArray(data.__data)) {
        return new Map(
          data.__data.map(([key, value]: [unknown, unknown]) => [
            deserialize(key),
            deserialize(value)
          ])
        )
      }
      if (data.__type === 'Set' && Array.isArray(data.__data)) {
        return new Set(data.__data.map(deserialize))
      }
      if (data.__type === 'Date' && typeof data.__data === 'string') {
        return new Date(data.__data)
      }
      if (data.__type === 'BigInt' && typeof data.__data === 'string') {
        return BigInt(data.__data)
      }
      if (
        data.__type === 'Symbol' &&
        (typeof data.__data === 'string' || typeof data.__data === 'undefined')
      ) {
        return Symbol(data.__data)
      }
    }
    if (Array.isArray(data)) {
      return data.map(deserialize)
    }

    const result: Record<KeyType, unknown> = {}
    for (const [key, value] of Object.entries(data) as Array<
      [KeyType, unknown]
    >) {
      result[key] = deserialize(value)
    }
    return result
  }
  return data
}
