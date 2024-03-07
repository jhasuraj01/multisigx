import { AndRule, AtleastRule, EndRule, OrRule, Rule, SignRule, StartRule } from '@jhasuraj01/interface'
import { RuleGraph, generateAndRule, generateAtleastRule, generateOrRule, generateSignRule } from '../src'
import { describe, test, expect } from 'vitest'


//Graph creation

const startRuleObject: StartRule = {
  dependents: new Set([
    "hod_1",
    "hod_2",
    "dean_1",
    "dean_2",
    "dean_3",
    "director"
  ]),
  id: "start",
  name: "Start Rule",
  type: "START",
}

const endRuleObject: EndRule = {
  "dependsOn": new Set([
    "or_1",
    "and_1"
  ]),
  id: "end",
  internalLogic: {
    type: "AND",
  },
  name: "End Rule",
  type: "END",
}

const sampleGraph = RuleGraph.create({
  description: "sample Graph",
  id: "graph1",
  title: "Graph 1"
})

const hod1 = generateSignRule({
  id: "hod_1",
  name: "Hod 1 Signature",
  internalLogic: {
    type: "AND"
  },
  "address": "address_hod_1"
})

const hod1Object: SignRule = {
  "id": "hod_1",
  "name": "Hod 1 Signature",
  "dependsOn": new Set([
    "start"
  ]),
  "dependents": new Set([
    "and_1"
  ]),
  "type": "SIGN",
  "internalLogic": {
    "type": "AND"
  },
  "address": "address_hod_1"
}

const hod2 = generateSignRule({
  id: "hod_2",
  name: "Hod 2 Signature",
  internalLogic: {
    type: "AND"
  },
  "address": "address_hod_2"
})

const hod2Object: SignRule = {
  "id": "hod_2",
  "name": "Hod 2 Signature",
  "dependsOn": new Set([
    "start"
  ]),
  "dependents": new Set([
    "and_1"
  ]),
  "type": "SIGN",
  "internalLogic": {
    "type": "AND"
  },
  "address": "address_hod_2"
}

const dean1 = generateSignRule({
  id: "dean_1",
  name: "Dean 1 Signature",
  internalLogic: {
    type: "AND"
  },
  "address": "address_dean_1"
})

const dean1Object: SignRule = {
  "id": "dean_1",
  "name": "Dean 1 Signature",
  "dependsOn": new Set([
    "start"
  ]),
  "dependents": new Set([
    "atleast_1"
  ]),
  "type": "SIGN",
  "internalLogic": {
    "type": "AND"
  },
  "address": "address_dean_1"
}

const dean2 = generateSignRule({
  id: "dean_2",
  name: "Dean 2 Signature",
  internalLogic: {
    type: "AND"
  },
  "address": "address_dean_2"
})

const dean2Object: SignRule = {
  "id": "dean_2",
  "name": "Dean 2 Signature",
  "dependsOn": new Set([
    "start"
  ]),
  "dependents": new Set([
    "atleast_1"
  ]),
  "type": "SIGN",
  "internalLogic": {
    "type": "AND"
  },
  "address": "address_dean_2"
}

const dean3 = generateSignRule({
  id: "dean_3",
  name: "Dean 3 Signature",
  internalLogic: {
    type: "AND"
  },
  "address": "address_dean_3"
})

const dean3Object: SignRule = {
  "id": "dean_3",
  "name": "Dean 3 Signature",
  "dependsOn": new Set([
    "start"
  ]),
  "dependents": new Set([
    "atleast_1"
  ]),
  "type": "SIGN",
  "internalLogic": {
    "type": "AND"
  },
  "address": "address_dean_3"
}

const director = generateSignRule({
  id: "director",
  name: "Director Signature",
  internalLogic: {
    type: "AND"
  },
  "address": "address_director_1"
})

const directorObject: SignRule = {
  "id": "director",
  "name": "Director Signature",
  "dependsOn": new Set([
    "start"
  ]),
  "dependents": new Set([
    "or_1"
  ]),
  "type": "SIGN",
  "internalLogic": {
    "type": "AND"
  },
  "address": "address_director_1"
}

const orRule = generateOrRule({
  id: "or_1",
  name: "Atleast 2 Deans Or director",
})

const orRuleObject: OrRule = {
  "id": "or_1",
  "name": "Atleast 2 Deans Or director",
  "dependsOn": new Set([
    "director",
    "atleast_1"
  ]),
  "dependents": new Set(["end"]),
  "type": "OR"
}

const andRule = generateAndRule({
  id: "and_1",
  name: "Hod 1 and Hod 2",
})

const andRuleObject: AndRule = {
  "id": "and_1",
  "name": "Hod 1 and Hod 2",
  "dependsOn": new Set([
    "hod_1",
    "hod_2"
  ]),
  "dependents": new Set(["end"]),
  "type": "AND"
}

const atleastRule = generateAtleastRule({
  id: "atleast_1",
  name: "Atleast 2 Deans",
  count: 2,
})

const atleastRuleObject: AtleastRule = {
  "id": "atleast_1",
  "name": "Atleast 2 Deans",
  "dependsOn": new Set([
    "dean_1",
    "dean_2",
    "dean_3"
  ]),
  "dependents": new Set([
    "or_1"
  ]),
  "type": "ATLEAST",
  "count": 2
}

//Add rules to graph
sampleGraph.addRule(hod1);
sampleGraph.addRule(hod2);
sampleGraph.addRule(dean1);
sampleGraph.addRule(dean2);
sampleGraph.addRule(dean3);
sampleGraph.addRule(director);
sampleGraph.addRule(orRule);
sampleGraph.addRule(andRule);
sampleGraph.addRule(atleastRule);

//Connect Edges
sampleGraph.connectRules("start", hod1.id);
sampleGraph.connectRules("start", hod2.id);

sampleGraph.connectRules("start", dean1.id);
sampleGraph.connectRules("start", dean2.id);
sampleGraph.connectRules("start", dean3.id);

sampleGraph.connectRules("start", director.id);

sampleGraph.connectRules(hod1.id, andRule.id);
sampleGraph.connectRules(hod2.id, andRule.id);

sampleGraph.connectRules(dean1.id, atleastRule.id);
sampleGraph.connectRules(dean2.id, atleastRule.id);
sampleGraph.connectRules(dean3.id, atleastRule.id);

sampleGraph.connectRules(director.id, orRule.id);

sampleGraph.connectRules(atleastRule.id, orRule.id);

sampleGraph.connectRules(orRule.id, "end");
sampleGraph.connectRules(andRule.id, "end");


describe('Rule Functions Tests', () => {


  const allRuleObjects: Rule[] = [
    startRuleObject,
    endRuleObject,
    hod1Object,
    hod2Object,
    dean1Object,
    dean2Object,
    dean3Object,
    directorObject,
    orRuleObject,
    andRuleObject,
    atleastRuleObject,
  ];

  //Testcases for getRule()
  test(`getRule should return the correct details for given id`, () => {
    for (const ruleObject of allRuleObjects) {
      const rule = sampleGraph.getRule(ruleObject.id)
      expect(rule).toStrictEqual(ruleObject);
    }
  })

  test('getRule should throw an error for non-existing rule', () => {
    expect(() => sampleGraph.getRule("blah")).toThrowError();
  });

  //TestCases for getAllRule()
  test('getAllRules should return an array of all rules', () => {
    const allRules = sampleGraph.getAllRules();
    expect(allRules).toStrictEqual(allRuleObjects);
  })

  //TestCase for getDependents()
  test('getDependents should return the correct dependents for a rule', () => {
    for (const ruleObject of allRuleObjects) {

      if (ruleObject.type === 'END') {
        expect(() => sampleGraph.getDependents(ruleObject.id)).toThrowError(`END RULE does not have any dependents.`);
        continue;
      }
      const dependents = sampleGraph.getDependents(ruleObject.id);
      const expectedDependentIds = Array.from(ruleObject.dependents);
      const expectedDependents = expectedDependentIds.map(id => allRuleObjects.find(obj => obj.id === id));

      expect(dependents).toStrictEqual(expectedDependents);

    }
  })

  //TestCase for getDependencies()
  test('getDependencies should return the correct dependencies for a rule', () => {
    for (const ruleObject of allRuleObjects) {
      if (ruleObject.type === 'START') {
        expect(() => sampleGraph.getDependencies(ruleObject.id)).toThrowError('StartRule does not have dependencies.');
        continue;
      }
      const dependencies = sampleGraph.getDependencies(ruleObject.id);
      const expectedDependencyIds = Array.from(ruleObject.dependsOn);
      const expectedDependencies = expectedDependencyIds.map(id => allRuleObjects.find(obj => obj.id === id));

      expect(dependencies).toStrictEqual(expectedDependencies);

    }
  });
})


