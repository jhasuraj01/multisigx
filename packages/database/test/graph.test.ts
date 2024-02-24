import { describe, expect, test } from 'vitest'
import { graphStorage } from '../src';
import { GraphType } from 'src/stores';

const graph: GraphType = {
  id: '1',
  nodes: [
    {
      id: '1',
      neighbors: []
    }
  ]
}

describe('GraphStorage Tests', () => {
  test('should store a graph', async () => {
    await expect(graphStorage.writeOne(graph)).resolves.toBeUndefined();
  })

  test('should retrive a stored graph', async () => {
    await expect(graphStorage.findOneById('1')).resolves.toStrictEqual(graph)
  })

  test('should update a stored graph', async () => {
    graph.nodes[0]?.neighbors.push({
      id: '2',
      neighbors: []
    })
    await expect(graphStorage.writeOne(graph)).resolves.toBeUndefined();
  })

  test('should retrive a updated graph', async () => {
    await expect(graphStorage.findOneById('1')).resolves.toStrictEqual(graph)
  })

  test('should delete graph', async () => {
    await expect(graphStorage.deleteOneById('1')).resolves.toBeUndefined();
  })

  test('should return empty array when no graph is present', async () => {
    await expect(graphStorage.getAll()).resolves.toStrictEqual([])
    await expect(graphStorage.getAllIds()).resolves.toStrictEqual([])
  })

  test('should throw error when graph not found', async () => {
    await expect(graphStorage.findOneById('1')).rejects.toThrowError()
  })

  test('should not throw error when deleting non existent graph', async () => {
    await expect(graphStorage.deleteOneById('1')).resolves.toBeUndefined()
  })

})
