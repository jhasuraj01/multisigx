import { z } from 'zod'
import { RuleSchema, type Rule, type RuleID, RuleIDSchema } from './rule'

export type GraphID = string
export const GraphIDSchema = z.string()

export interface RuleGraphObject {
  id: GraphID
  identifier: 'multisigx-rule_graph_object'
  version: 1
  title: string
  description: string
  rules: Map<RuleID, Rule>
}
export const RuleGraphObjectSchema = z.object({
  id: GraphIDSchema,
  identifier: z.literal('multisigx-rule_graph_object'),
  version: z.literal(1),
  title: z.string(),
  description: z.string(),
  rules: z.map(RuleIDSchema, RuleSchema)
})
