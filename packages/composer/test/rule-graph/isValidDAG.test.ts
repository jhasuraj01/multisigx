import { RuleGraph } from 'src'
import {describe, expect, test } from 'vitest'

const graphCycle: object = {
  id: 'graph-cycle',
  title: 'Rule Graph with Cycle',
  description: 'Test Rule Graph',
  identifier: 'multisigx-rule_graph_object',
  version: 1,
  rules: new Map([
    ['start', {
      id: 'start',
      name: 'Start Rule',
      dependents: new Set(['node_1']),
      type: 'START'
    }],
    ['node_1', {
      id: 'node_1',
      address: 'address_node_1',
      name: 'Node One',
      dependsOn: new Set(['start']),
      dependents: new Set(['node_2']),
      type: 'SIGN',
      internalLogic: {
        type: 'AND'
      }
    }],
    ['node_2', {
      id: 'node_2',
      address: 'address_node_2',
      name: 'Node Two',
      dependsOn: new Set(['node_1']),
      dependents: new Set(['node_3']),
      type: 'SIGN',
      internalLogic: {
        type: 'AND'
      }
    }],
    ['node_3', {
      id: 'node_3',
      address: 'address_node_3',
      name: 'Node Three',
      dependsOn: new Set(['node_2']),
      dependents: new Set(['node_4']),
      type: 'SIGN',
      internalLogic: {
        type: 'AND'
      }
    }],
    ['node_4', {
      id: 'node_4',
      address: 'address_node_4',
      name: 'Node Four',
      dependsOn: new Set(['node_3']),
      dependents: new Set(['node_1', 'end']),
      type: 'SIGN',
      internalLogic: {
        type: 'AND'
      }
    }],
    ['end', {
      id: 'end',
      name: 'End Rule',
      type: 'END',
      dependsOn: new Set(['node_4']),
      internalLogic: {
        type: 'AND'
      }
    }]
  ]),
}


const graphNoCycle: object = {
  id: 'graph-No-cycle',
  title: 'Rule Graph with no Cycle',
  description: 'Test Rule Graph',
  identifier: 'multisigx-rule_graph_object',
  version: 1,
  rules: new Map([
    ['start', {
      id: 'start',
      name: 'Start Rule',
      dependents: new Set(['node_1']),
      type: 'START'
    }],
    ['node_1', {
      id: 'node_1',
      address: 'address_node_1',
      name: 'Node One',
      dependsOn: new Set(['start']),
      dependents: new Set(['node_2', 'node_4']),
      type: 'SIGN',
      internalLogic: {
        type: 'AND'
      }
    }],
    ['node_2', {
      id: 'node_2',
      address: 'address_node_2',
      name: 'Node Two',
      dependsOn: new Set(['node_1']),
      dependents: new Set(['node_3']),
      type: 'SIGN',
      internalLogic: {
        type: 'AND'
      }
    }],
    ['node_3', {
      id: 'node_3',
      address: 'address_node_3',
      name: 'Node Three',
      dependsOn: new Set(['node_2']),
      dependents: new Set(['node_4']),
      type: 'SIGN',
      internalLogic: {
        type: 'AND'
      }
    }],
    ['node_4', {
      id: 'node_4',
      address: 'address_node_4',
      name: 'Node Four',
      dependsOn: new Set(['node_3', 'node_1']),
      dependents: new Set(['end']),
      type: 'SIGN',
      internalLogic: {
        type: 'AND'
      }
    }],
    ['end', {
      id: 'end',
      name: 'End Rule',
      type: 'END',
      dependsOn: new Set(['node_4']),
      internalLogic: {
        type: 'AND'
      }
    }]
  ]),
}

const graphDisconnectedLoop: object = {
  id: 'graph-has-DisconnectedLoop',
  title: 'Rule Graph with Disconnected Loop',
  description: 'Test Rule Graph',
  identifier: 'multisigx-rule_graph_object',
  version: 1,
  rules: new Map([
    ['start', {
      id: 'start',
      name: 'Start Rule',
      dependents: new Set(['node_1']),
      type: 'START'
    }],
    ['node_1', {
      id: 'node_1',
      address: 'address_node_1',
      name: 'Node One',
      dependsOn: new Set(['start']),
      dependents: new Set(['node_2', 'node_3']),
      type: 'SIGN',
      internalLogic: {
        type: 'AND'
      }
    }],
    ['node_2', {
      id: 'node_2',
      address: 'address_node_2',
      name: 'Node Two',
      dependsOn: new Set(['node_1']),
      dependents: new Set(['node_3']),
      type: 'SIGN',
      internalLogic: {
        type: 'AND'
      }
    }],
    ['node_3', {
      id: 'node_3',
      address: 'address_node_3',
      name: 'Node Three',
      dependsOn: new Set(['node_2', 'node_1']),
      dependents: new Set(),
      type: 'SIGN',
      internalLogic: {
        type: 'AND'
      }
    }],
    ['node_4', {
      id: 'node_4',
      address: 'address_node_4',
      name: 'Node Four',
      dependsOn: new Set(['node_6']),
      dependents: new Set(['node_5']),
      type: 'SIGN',
      internalLogic: {
        type: 'AND'
      }
    }],
    ['node_5', {
      id: 'node_5',
      address: 'address_node_5',
      name: 'Node Five',
      dependsOn: new Set(['node_4']),
      dependents: new Set(['node_6']),
      type: 'SIGN',
      internalLogic: {
        type: 'AND'
      }
    }],
    ['node_6', {
      id: 'node_6',
      address: 'address_node_6',
      name: 'Node Six',
      dependsOn: new Set(['node_5']),
      dependents: new Set(['node_4', 'end']),
      type: 'SIGN',
      internalLogic: {
        type: 'AND'
      }
    }],
    ['end', {
      id: 'end',
      name: 'End Rule',
      type: 'END',
      dependsOn: new Set(['node_6']),
      internalLogic: {
        type: 'AND'
      }
    }]
  ]),
}

const graphSelfLoop: object = {
  id: 'graph-has-selfloop',
  title: 'Rule Graph with self loop',
  description: 'Test Rule Graph',
  identifier: 'multisigx-rule_graph_object',
  version: 1,
  rules: new Map([
    ['start', {
      id: 'start',
      name: 'Start Rule',
      dependents: new Set(['node_1']),
      type: 'START'
    }],
    ['node_1', {
      id: 'node_1',
      address: 'address_node_1',
      name: 'Node One',
      dependsOn: new Set(['start', 'node_2']),
      dependents: new Set(['node_2']),
      type: 'SIGN',
      internalLogic: {
        type: 'AND'
      }
    }],
    ['node_2', {
      id: 'node_2',
      address: 'address_node_2',
      name: 'Node Two',
      dependsOn: new Set(['node_1']),
      dependents: new Set(['node_1', 'end']),
      type: 'SIGN',
      internalLogic: {
        type: 'AND'
      }
    }],
    ['end', {
      id: 'end',
      name: 'End Rule',
      type: 'END',
      dependsOn: new Set(['node_2']),
      internalLogic: {
        type: 'AND'
      }
    }]
  ]),
}

const noEdgeGraph: object = {
  id: 'graph-has-NoEdge',
  title: 'Rule Graph with No edge',
  description: 'Test Rule Graph',
  identifier: 'multisigx-rule_graph_object',
  version: 1,
  rules: new Map([
    ['start', {
      id: 'start',
      name: 'Start Rule',
      dependents: new Set(),
      type: 'START'
    }],
    ['end', {
      id: 'end',
      name: 'End Rule',
      type: 'END',
      dependsOn: new Set(),
      internalLogic: {
        type: 'AND'
      }
    }]
  ]),
}

const noNode: object = {
  id: 'graph-has-noNode',
  title: 'Rule Graph with No Node',
  description: 'Test Rule Graph',
  identifier: 'multisigx-rule_graph_object',
  version: 1,
  rules: new Map()
}

const startNode: object = {
  id: 'graph-has-Start-Node',
  title: 'Rule Graph with No Node',
  description: 'Test Rule Graph',
  identifier: 'multisigx-rule_graph_object',
  version: 1,
  rules: new Map([
    ['start', {
      id: 'start',
      name: 'Start Rule',
      dependents: new Set(),
      type: 'START'
    }]
  ])
}

const endNode: object = {
  id: 'graph-has-endNode',
  title: 'Rule Graph with end node',
  description: 'Test Rule Graph',
  identifier: 'multisigx-rule_graph_object',
  version: 1,
  rules: new Map([
    ['end', {
      id: 'end',
      name: 'End Rule',
      type: 'END',
      dependsOn: new Set(),
      internalLogic: {
        type: 'AND'
      }
    }]
  ])
}

const singleNode: object = {
  id: 'graph-has-single-node',
  title: 'Rule Graph with single node',
  description: 'Test Rule Graph',
  identifier: 'multisigx-rule_graph_object',
  version: 1,
  rules: new Map([
    ['node_1', {
      id: 'node_1',
      address: 'address_node_1',
      name: 'Node One',
      type: 'SIGN',
      dependsOn: new Set(),
      dependents: new Set(),
      internalLogic: {
        type: 'AND'
      }
    }]
  ]),
}

const singleEdge: object = {
  id: 'graph-has-singleEdge',
  title: 'Rule Graph with single edge',
  description: 'Test Rule Graph',
  identifier: 'multisigx-rule_graph_object',
  version: 1,
  rules: new Map([
    ['start', {
      id: 'start',
      name: 'Start Rule',
      dependents: new Set(['end']),
      type: 'START'
    }],
    ['end', {
      id: 'end',
      name: 'End Rule',
      type: 'END',
      dependsOn: new Set(['start']),
      internalLogic: {
        type: 'AND'
      }
    }]
  ]),
}


describe('isValidDirectedAcyclicGraph Tests', () => {
  test('should return true for a graph without a cycle', () => {
    const graph = RuleGraph.import(graphNoCycle)
    expect(graph.isValidDirectedAcyclicGraph()).toBe(true)
  })

  test('should return false for a graph with a cycle', () => {
    const graph = RuleGraph.import(graphCycle)
    expect(graph.isValidDirectedAcyclicGraph()).toBe(false)
  })

  test('should return false for a graph with a disconnected loop', () => {
    const graph = RuleGraph.import(graphDisconnectedLoop)
    expect(graph.isValidDirectedAcyclicGraph()).toBe(false)
  })

  test('should return false for a graph with a self-loop', () => {
    const graph = RuleGraph.import(graphSelfLoop)
    expect(graph.isValidDirectedAcyclicGraph()).toBe(false)
  })

  test('should return true for a graph with no edges', () => {
    const graph = RuleGraph.import(noEdgeGraph)
    expect(graph.isValidDirectedAcyclicGraph()).toBe(true)
  })

  test('should return false for a graph with no nodes', () => {
    const graph = RuleGraph.import(noNode)
    expect(graph.isValidDirectedAcyclicGraph()).toBe(true)
  })

  test('should return true for a graph with only a start node', () => {
    const graph = RuleGraph.import(startNode)
    expect(graph.isValidDirectedAcyclicGraph()).toBe(true)
  })

  test('should return true for a graph with only an end node', () => {
    const graph = RuleGraph.import(endNode)
    expect(graph.isValidDirectedAcyclicGraph()).toBe(true)
  })

  test('should return true for a graph with a single node', () => {
    const graph = RuleGraph.import(singleNode)
    expect(graph.isValidDirectedAcyclicGraph()).toBe(true)
  })

  test('should return true for a graph with a single edge', () => {
    const graph = RuleGraph.import(singleEdge)
    expect(graph.isValidDirectedAcyclicGraph()).toBe(true)
  })
})
