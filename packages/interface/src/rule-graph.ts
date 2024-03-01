import type { Rule, RuleID } from './rule'

export type GraphID = string

export type RuleGraphObject = {
  id: GraphID
  identifier: 'multisigx-rule_graph_object'
  version: 1
  title: string
  description: string
  rules: Record<RuleID, Rule>
}
