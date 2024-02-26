import { type Rule, type RuleID } from './rule'

export type GraphID = string

export interface GraphObject {
  id: GraphID
  identifier: 'multisigx-graph_object'
  version: 1
  title: string
  description: string
  rules: Rule[]
}

export interface IGraph {
  /**
   * ### Import Graph
   * @param graph JSON representation of the graph
   * @returns The instance of the Graph
   */
  import: (graph: object) => IGraph

  /**
   * ### Export Graph
   * @returns JSON representation of the graph
   */
  export: () => GraphObject

  createRule: (rule: Rule) => Promise<Rule>
  deleteRule: (id: RuleID) => Promise<void>

  /**
   * ### Is Safe To Connect
   * @returns True if it is safe to connect the two rules
   *
   * Useful to prevent cycles in the graph in online mode.
   */
  isSafeToConnect: (from: RuleID, to: RuleID) => Promise<boolean>
  connectRules: (from: RuleID, to: RuleID) => Promise<void>
  disconnectRules: (from: RuleID, to: RuleID) => Promise<void>

  /**
   * ### Find All Safe Dependents
   * @returns List of all rule ids that are safe to connect from a given rule
   *
   * Useful when we would need to hide all others rules that are not safe to connect.
   * This would be used in the UI to prevent the user from connecting rules that would
   * create a cycle in the graph.
   */
  findAllSafeDependents: (from: RuleID) => Promise<RuleID[]>

  /**
   * ### Find All Cyclic Paths
   * @returns List of all paths that are part of a cycle
   *
   * Useful when graph would be imported from a JSON and we need
   * to display all the paths that are part of a cycle.
   */
  findAllCyclicPaths: () => Promise<RuleID[][]>

  /**
   * ### Is Valid Directed Acyclic Graph
   * @returns True if the graph is a valid directed acyclic graph
   *
   * Useful when graph would be imported from a JSON and we need
   * to verify if the graph is a valid directed acyclic graph.
   */
  isValidDirectedAcyclicGraph: () => Promise<boolean>

  getRule: (id: RuleID) => Promise<Rule>
  getAllRules: () => Promise<Rule[]>
  getDependents: (id: RuleID) => Promise<Rule[]>
  getDependencies: (id: RuleID) => Promise<Rule[]>
}
