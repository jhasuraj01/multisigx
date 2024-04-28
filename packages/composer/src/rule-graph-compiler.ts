import {
  RuleGraphObject,
  type Rule
} from '@jhasuraj01/interface';

interface RuleGraphCompiledObject {
  ids: string[];
  names: string[];
  dependentsArray: string[][];
  dependsOnArray: string[][];
  types: string[];
  internalLogicArray: string[];
  addressArray: string[];
  thresholdArray: number[];
}

export const compile = (_graphObject: RuleGraphObject): RuleGraphCompiledObject => {
  const ids: string[] = [];
  const names: string[] = [];
  const dependentsArray: string[][] = [];
  const dependsOnArray: string[][] = [];
  const types: string[] = [];
  const internalLogicArray: string[] = [];
  const addressArray: string[] = [];
  const thresholdArray: number[] = [];

  const rules: Rule[] = Array.from(_graphObject.rules.values());

  rules.forEach((rule) => {
    const id = rule?.id;
    const name = rule?.name;
    const type = rule?.type;
    let dependents: string[] = [];
    if(type !== 'END') {
      dependents = Array.from(rule.dependents.values());
    }
    let dependsOn: string[] = [];
    if(type !== 'START') {
      dependsOn = Array.from(rule.dependsOn.values());
    }
    let internalLogicType: string = '';
    if(type === 'SIGN' || type === 'END') {
      internalLogicType = rule?.internalLogic?.type;
    }
    let address: string = '0x0000000000000000000000000000000000000000';
    if(type === 'SIGN') {
      address = rule?.address;
    }

    let threshold;

    switch (type) {
      case 'SIGN':
        if (rule?.internalLogic?.type === 'AND')
          threshold = dependsOn.length;
        else if (rule?.internalLogic?.type === 'OR')
          threshold = 1;
        else
          threshold = rule?.internalLogic?.count;
        break;
      case 'END':
        if (rule?.internalLogic?.type === 'AND')
          threshold = dependsOn.length;
        else if (rule?.internalLogic?.type === 'OR')
          threshold = 1;
        else
          threshold = rule?.internalLogic?.count;
        break;
      case 'AND':
        threshold = dependsOn.length;
        break;
      case 'OR':
        threshold = 1;
        break;
      case 'ATLEAST':
        threshold = rule?.count;
        break;
      case 'START':
        threshold = 0;
        break;
      default:
        threshold = -1;
        throw new Error('Invalid Rule');
    }

    ids.push(id);
    names.push(name);
    dependentsArray.push(dependents);
    dependsOnArray.push(dependsOn);
    types.push(type);
    internalLogicArray.push(internalLogicType);
    addressArray.push(address);
    thresholdArray.push(threshold);
  });

  return {
    ids,
    names,
    dependentsArray,
    dependsOnArray,
    types,
    internalLogicArray,
    addressArray,
    thresholdArray
  };
}