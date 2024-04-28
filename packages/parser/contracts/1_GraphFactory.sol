// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

import './2_GraphContract.sol';

contract GraphFactory {
  constructor() {}
  function build(
    string[] memory ids,
    string[] memory names,
    string[][] memory dependentsArray,
    string[][] memory dependsOnArray,
    string[] memory types,
    string[] memory internalLogicArray,
    address[] memory addressArray,
    int[] memory thresholdArray
  ) public returns (address) {
    GraphContract graph = new GraphContract(
      ids,
      names,
      dependentsArray,
      dependsOnArray,
      types,
      internalLogicArray,
      addressArray,
      thresholdArray
    );
    return address(graph);
  }
}
