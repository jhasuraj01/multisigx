import type { Rule, RuleID } from './rule'
import type { RuleGraphObject } from './rule-graph'

export abstract class AbstractRuleGraph {
  /**
   * ### Import Graph
   * @param graph JSON representation of the graph
   * @returns The instance of the Graph
   */
  static import(_graph: object): AbstractRuleGraph {
    throw new Error('AbstractRuleGraph.import not implemented.')
  }

  /**
   * ### Export Graph
   * @returns JSON representation of the graph
   */
  export(): RuleGraphObject {
    throw new Error('AbstractRuleGraph.export not implemented.')
  }

  addRule(_rule: Rule): AbstractRuleGraph {
    throw new Error('AbstractRuleGraph.addRule not implemented.')
  }

  removeRule(_id: RuleID): AbstractRuleGraph {
    throw new Error('AbstractRuleGraph.removeRule not implemented.')
  }

  /**
   * ### Is Safe To Connect
   * @returns True if it is safe to connect the two rules
   *
   * Useful to prevent cycles in the graph in online mode.
   */
  isSafeToConnect(_from: RuleID, _to: RuleID): boolean {
    throw new Error('AbstractRuleGraph.isSafeToConnect not implemented.')
  }

  connectRules(_from: RuleID, _to: RuleID): AbstractRuleGraph {
    throw new Error('AbstractRuleGraph.connectRules not implemented.')
  }

  disconnectRules(_from: RuleID, _to: RuleID): AbstractRuleGraph {
    throw new Error('AbstractRuleGraph.disconnectRules not implemented.')
  }

  /**
   * ### Find All Safe Targets
   * @returns List of all rule ids that are safe to connect from a given rule
   *
   * Useful when we would need to hide all others rules that are not safe to connect.
   * This would be used in the UI to prevent the user from connecting rules that would
   * create a cycle in the graph.
   */
  findAllSafeTargets(_from: RuleID): RuleID[] {
    throw new Error('AbstractRuleGraph.findAllSafeTargets not implemented.')
  }

  /**
   * ### Find All Cyclic Paths
   * @returns List of all paths that are part of a cycle
   *
   * Useful when graph would be imported from a JSON and we need
   * to display all the paths that are part of a cycle.
   */
  findAllCyclicPaths(): RuleID[][] {
    throw new Error('AbstractRuleGraph.findAllCyclicPaths not implemented.')
  }

  /**
   * ### Is Valid Directed Acyclic Graph
   * @returns True if the graph is a valid directed acyclic graph
   *
   * Useful when graph would be imported from a JSON and we need
   * to verify if the graph is a valid directed acyclic graph.
   */
  isValidDirectedAcyclicGraph(): boolean {
    throw new Error(
      'AbstractRuleGraph.isValidDirectedAcyclicGraph not implemented.'
    )
  }

  getRule(_id: RuleID): Rule {
    throw new Error('AbstractRuleGraph.getRule not implemented.')
  }

  getAllRules(): Rule[] {
    throw new Error('AbstractRuleGraph.getAllRules not implemented.')
  }

  getDependents(_id: RuleID): Rule[] {
    throw new Error('AbstractRuleGraph.getDependents not implemented.')
  }

  getDependencies(_id: RuleID): Rule[] {
    throw new Error('AbstractRuleGraph.getDependencies not implemented.')
  }
}
