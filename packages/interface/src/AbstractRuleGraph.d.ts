import type { Rule, RuleID } from './rule'
import type { RuleGraphObject } from './rule-graph'

export abstract class AbstractRuleGraph {
  /**
   * ### Import Graph
   * @param graph JSON representation of the graph
   * @returns The instance of the Graph
   */
  static import(graph: object): AbstractRuleGraph

  /**
   * ### Export Graph
   * @returns JSON representation of the graph
   */
  export(): RuleGraphObject

  addRule(rule: Rule): AbstractRuleGraph
  removeRule(id: RuleID): AbstractRuleGraph

  /**
   * ### Is Safe To Connect
   * @returns True if it is safe to connect the two rules
   *
   * Useful to prevent cycles in the graph in online mode.
   */
  isSafeToConnect(from: RuleID, to: RuleID): boolean
  connectRules(from: RuleID, to: RuleID): AbstractRuleGraph
  disconnectRules(from: RuleID, to: RuleID): AbstractRuleGraph

  /**
   * ### Find All Safe Targets
   * @returns List of all rule ids that are safe to connect from a given rule
   *
   * Useful when we would need to hide all others rules that are not safe to connect.
   * This would be used in the UI to prevent the user from connecting rules that would
   * create a cycle in the graph.
   */
  findAllSafeTargets(from: RuleID): RuleID[]

  /**
   * ### Find All Cyclic Paths
   * @returns List of all paths that are part of a cycle
   *
   * Useful when graph would be imported from a JSON and we need
   * to display all the paths that are part of a cycle.
   */
  findAllCyclicPaths(): RuleID[][]

  /**
   * ### Is Valid Directed Acyclic Graph
   * @returns True if the graph is a valid directed acyclic graph
   *
   * Useful when graph would be imported from a JSON and we need
   * to verify if the graph is a valid directed acyclic graph.
   */
  isValidDirectedAcyclicGraph(): boolean

  getRule(id: RuleID): Rule
  getAllRules(): Rule[]
  getDependents(id: RuleID): Rule[]
  getDependencies(id: RuleID): Rule[]
}