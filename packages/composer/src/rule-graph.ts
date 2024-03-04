import {
  type RuleGraphObject,
  AbstractRuleGraph,
  type Rule,
  type RuleID,
  RuleGraphObjectSchema,
  CreateRuleGraphParams
} from '@jhasuraj01/interface'
import { nameGeneratorBaseConfig, uuid } from './utils'
import { uniqueNamesGenerator } from 'unique-names-generator'
import { generateEndRule, generateStartRule } from './rule-generator'

const graphTitleGeneratorConfig = {
  ...nameGeneratorBaseConfig,
  separator: ' ',
  length: 5
}

export class RuleGraph extends AbstractRuleGraph {
  private readonly graphObject: RuleGraphObject

  private constructor(_graphObject: RuleGraphObject) {
    super()
    this.graphObject = _graphObject
  }

  static override create(_params: CreateRuleGraphParams): RuleGraph {
    const startRule = generateStartRule({ id: 'start-rule', name: 'Start Rule' })
    const endRule = generateEndRule({ id: 'end-rule',  name: 'End Rule' })

    const rules = new Map<RuleID, Rule>()
    rules.set(startRule.id, startRule);
    rules.set(endRule.id, endRule);

    const ruleGraphObject: RuleGraphObject = RuleGraphObjectSchema.parse({
      id: _params.id ?? uuid(),
      identifier: 'multisigx-rule_graph_object',
      version: _params.version ?? 1,
      title: _params.title ?? uniqueNamesGenerator(graphTitleGeneratorConfig),
      description: _params.description ?? '',
      rules: rules
    })

    return new RuleGraph(ruleGraphObject)
  }

  static override import(_graph: object): RuleGraph {
    const _graphObject = RuleGraphObjectSchema.parse(_graph)
    return new RuleGraph(_graphObject)
  }

  override export(): RuleGraphObject {
    return structuredClone(this.graphObject)
  }

  override addRule(_rule: Rule): this {
    this.graphObject.rules.set(_rule.id, _rule)
    return this
  }

  override removeRule(_id: RuleID): this {
    const ruleToRemove = this.graphObject.rules.get(_id)

    if (ruleToRemove === undefined)
      throw new Error('_id: RuleID is invalid, Rule Not Found')

    if (ruleToRemove.type !== 'END') {
      ruleToRemove.dependents.forEach((_dependentId) => {
        this.disconnectRules(_id, _dependentId)
      })
    }

    if (ruleToRemove.type !== 'START') {
      ruleToRemove.dependsOn.forEach((_dependOnId) => {
        this.disconnectRules(_dependOnId, _id)
      })
    }

    this.graphObject.rules.delete(_id)

    return this
  }

  override isSafeToConnect(_from: RuleID, _to: RuleID): boolean {
    const source = this.graphObject.rules.get(_from)
    const target = this.graphObject.rules.get(_to)

    if (source === undefined)
      throw new Error('_from: RuleID is invalid, Rule Not Found')
    if (target === undefined)
      throw new Error('_to: RuleID is invalid, Rule Not Found')

    if (source.type === 'END')
      throw new Error('_to: RuleID is invalid, EndRule can not have dependents')
    if (target.type === 'START')
      throw new Error(
        '_from: RuleID is invalid, StartRule can not have dependencies'
      )

    return (
      source.type === 'START' ||
      target.type === 'END' ||
      !this.hasPath(_to, _from)
    )
  }

  override connectRules(_from: RuleID, _to: RuleID): this {
    if (!this.isSafeToConnect(_from, _to))
      throw new Error('Cyclic Edges are not possible.')

    const source = this.graphObject.rules.get(_from)
    const target = this.graphObject.rules.get(_to)

    if (source === undefined)
      throw new Error('_from: RuleID is invalid, Rule Not Found')
    if (target === undefined)
      throw new Error('_to: RuleID is invalid, Rule Not Found')

    if (source.type === 'END')
      throw new Error('_to: RuleID is invalid, EndRule can not have dependents')
    if (target.type === 'START')
      throw new Error(
        '_from: RuleID is invalid, StartRule can not have dependencies'
      )

    source.dependents.add(_to)
    target.dependsOn.add(_from)

    return this
  }

  hasPath = (
    _from: RuleID,
    _to: RuleID,
    visited: Set<RuleID> = new Set()
  ): boolean => {
    if (_from === _to) return true

    visited.add(_from)

    const source = this.graphObject.rules.get(_from)

    if (source === undefined)
      throw new Error('_from: RuleID is invalid, Rule Not Found')

    if (source.type === 'END') return false

    for (const _dependent of source.dependents) {
      if (!visited.has(_dependent) && this.hasPath(_dependent, _to, visited)) {
        return true
      }
    }

    return false
  }

  override disconnectRules(_from: RuleID, _to: RuleID): this {
    const source = this.graphObject.rules.get(_from)
    const target = this.graphObject.rules.get(_to)

    if (source === undefined)
      throw new Error('_from: RuleID is invalid, Rule Not Found')
    if (target === undefined)
      throw new Error('_to: RuleID is invalid, Rule Not Found')

    if (source.type === 'END')
      throw new Error(
        '_to: RuleID is invalid, EndRule does not have dependents'
      )
    if (target.type === 'START')
      throw new Error(
        '_from: RuleID is invalid, StartRule does not have dependencies'
      )

    source.dependents.delete(_from)
    target.dependsOn.delete(_to)

    return this
  }

  /**
   * @todo Implement for UI
   */
  override findAllSafeTargets(_from: RuleID): RuleID[] {
    throw new Error('findAllSafeTargets is not implemented')
  }

  /**
   * @todo Implement for UI
   */
  override findAllCyclicPaths(): RuleID[][] {
    throw new Error('findAllCyclicPaths is not implemented')
  }

  private hasCycle(
    nodeId: RuleID,
    visited: Set<RuleID>,
    pathVisited: Set<RuleID>
  ): boolean {
    if (pathVisited.has(nodeId)) {
      return true
    }
    if (visited.has(nodeId)) {
      return false
    }

    visited.add(nodeId)
    pathVisited.add(nodeId)

    const rule = this.getRule(nodeId)
    if (rule.type === 'END') {
      return false
    }

    for (const neighborId of rule.dependents) {
      if (this.hasCycle(neighborId, visited, pathVisited)) {
        return true
      }
    }

    pathVisited.delete(nodeId)
    return false
  }

  override isValidDirectedAcyclicGraph(): boolean {
    const visited = new Set<RuleID>()
    const pathVisited = new Set<RuleID>()

    for (const ruleID in this.graphObject.rules) {
      if (this.hasCycle(ruleID, visited, pathVisited)) {
        return false
      }
    }
    return true
  }

  override getRule(_id: RuleID): Rule {
    const rule = this.graphObject.rules.get(_id)
    if (rule === undefined) {
      throw new Error(`Rule with ID '${_id}' not found.`)
    }
    return rule
  }

  override getAllRules(): Rule[] {
    return Array.from(this.graphObject.rules.values())
  }

  override getDependents(_id: RuleID): Rule[] {
    const rule = this.getRule(_id)
    if (rule.type === 'END') {
      throw new Error(`END RULE does not have any dependents.`)
    }

    const dependents: Rule[] = []
    for (const dependentId of rule.dependents) {
      const dependentRule = this.getRule(dependentId)
      dependents.push(dependentRule)
    }

    return dependents
  }

  override getDependencies(_id: RuleID): Rule[] {
    const rule = this.getRule(_id)

    if (rule.type === 'START') {
      throw new Error(`StartRule does not have dependencies.`)
    }

    const dependencies: Rule[] = []
    for (const dependencyId of rule.dependsOn) {
      const dependencyRule = this.getRule(dependencyId)
      dependencies.push(dependencyRule)
    }

    return dependencies
  }

  // printAdjacencyList = (): void => {
  //   this.nodes.forEach((node) => {
  //     const neighbors = node.neighbors.map((neighbor) => neighbor.id).join(', ')
  //     console.log(`${node.id as unknown as string}: ${neighbors}`)
  //   })
  // }
}
