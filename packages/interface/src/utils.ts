import { KeysOfUnion } from "type-fest";

/**
 * ## DistributedOmit
 * Fixes: Omit isn't distributive over unions
 * @link https://github.com/sindresorhus/type-fest/pull/820
 */
export type DistributedOmit<ObjectType, KeyType extends KeysOfUnion<ObjectType>> =
	ObjectType extends unknown
		? Omit<ObjectType, KeyType>
		: never;