// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract GraphContract {
  enum NodeStatus {
    INACTIVE,
    PENDING,
    APPROVED,
    REJECTED,
    SUSPENDED
  }

  struct Node {
    string id;
    string name;
    string logicType;
    string[] dependents;
    string[] dependsOn;
    string internalLogic;
    address _address;
    int threshold;
  }

  struct DynamicNodeData {
    string id;
    int requiredApprovals;
    int requiredRejections;
    NodeStatus nodeStatus;
  }

  uint public n;

  mapping(string => Node) public graph;
  mapping(string => mapping(string => DynamicNodeData)) public applications;

  string[] ruleIds;

  constructor(
    string[] memory ids,
    string[] memory names,
    string[][] memory dependentsArray,
    string[][] memory dependsOnArray,
    string[] memory types,
    string[] memory internalLogicArray,
    string[] memory addressArray,
    int[] memory thresholdArray
  ) {
    n = ids.length;
    for (uint i = 0; i < ids.length; i++) {
      graph[ids[i]] = Node(
        ids[i],
        names[i],
        types[i],
        dependentsArray[i],
        dependsOnArray[i],
        internalLogicArray[i],
        address(bytes20(bytes(addressArray[i]))),
        thresholdArray[i]
      );
      ruleIds.push(ids[i]);
    }
  }

  function createApplication(string memory applicationId) public {
    for (uint i = 0; i < n; i++) {
      applications[applicationId][ruleIds[i]] = DynamicNodeData(
        ruleIds[i],
        graph[ruleIds[i]].threshold,
        int(n) - graph[ruleIds[i]].threshold + 1,
        NodeStatus.INACTIVE
      );
    }
    bfsApprove(applicationId, 'start');
  }

  function getStatus(
    string memory applicationId
  ) public view returns (DynamicNodeData[] memory) {
    DynamicNodeData[] memory ans = new DynamicNodeData[](n);
    for (uint i = 0; i < n; i++) {
      ans[i] = applications[applicationId][ruleIds[i]];
    }
    return ans;
  }

  function canApprove(
    string memory applicationId,
    string memory ruleId
  ) internal view returns (bool) {
    return applications[applicationId][ruleId].requiredApprovals <= 0;
  }

  function canReject(
    string memory applicationId,
    string memory ruleId
  ) internal view returns (bool) {
    return applications[applicationId][ruleId].requiredRejections <= 0;
  }

  // add sign
  function sign(string memory applicationId, string memory ruleId) public {
    require(
      keccak256(bytes(graph[ruleId].logicType)) == keccak256(bytes('SIGN')),
      'Not a sign Rule'
    );
    require(graph[ruleId]._address == msg.sender, 'Unauthorized to Sign');
    require(canApprove(applicationId, ruleId), "Can't sign yet");
    require(
      applications[applicationId][ruleId].nodeStatus == NodeStatus.PENDING,
      'Already signed/rejected'
    );

    applications[applicationId][ruleId].nodeStatus = NodeStatus.APPROVED; // accepted

    bfsApprove(applicationId, ruleId);
  }

  function bfsApprove(string memory applicationId, string memory ruleId) internal {
    string[] memory A = new string[](n);
    string[] memory B = new string[](n);
    uint ai = 0;
    uint bj = 0;

    A[ai++] = ruleId; // push

    while (ai != 0 || bj != 0) {
      string memory currentRuleId;

      // peek start
      if (bj != 0) {
        currentRuleId = B[bj - 1];
      } else {
        while (ai > 0) {
          B[bj++] = A[--ai];
        }
        currentRuleId = B[bj - 1];
      }
      // peek end

      bj--; // pop

      bool isApproved = false;

      string memory ruleType = graph[currentRuleId].logicType;

      if (
        keccak256(bytes(ruleType)) == keccak256(bytes('START')) ||
        keccak256(bytes(ruleType)) == keccak256(bytes('END'))
      ) isApproved = true;
      else if (keccak256(bytes(ruleType)) == keccak256(bytes('SIGN'))){
        // only approve source signatory
        if(keccak256(bytes(graph[currentRuleId].id)) == keccak256(bytes(ruleId)))
          isApproved = true;
        else if(canApprove(applicationId, ruleId))
          applications[applicationId][ruleId].nodeStatus = NodeStatus.PENDING;
      }
      else isApproved = canApprove(applicationId, ruleId);

      if (!isApproved) continue;

      applications[applicationId][ruleId].nodeStatus = NodeStatus.APPROVED;

      for (uint i = 0; i < graph[currentRuleId].dependents.length; i++) {
        string memory nextRuleId = graph[currentRuleId].dependents[i];

        applications[applicationId][nextRuleId].requiredApprovals--;

        if (canApprove(applicationId, nextRuleId))
          A[ai++] = nextRuleId;
      }
    }
  }

  function reject(string memory applicationId, string memory ruleId) public {
    require(
      keccak256(bytes(graph[ruleId].logicType)) == keccak256(bytes('SIGN')),
      'Not a sign Rule'
    );
    require(graph[ruleId]._address == msg.sender, 'Unauthorized to Reject');
    require(canReject(applicationId, ruleId), "Can't Reject yet");
    require(
      applications[applicationId][ruleId].nodeStatus == NodeStatus.PENDING,
      'Already signed/rejected'
    );

    applications[applicationId][ruleId].nodeStatus = NodeStatus.REJECTED;

    bfsReject(applicationId, ruleId);
  }

  function bfsReject(string memory applicationId, string memory ruleId) internal {
    string[] memory A = new string[](n);
    string[] memory B = new string[](n);
    uint ai = 0;
    uint bj = 0;

    A[ai++] = ruleId; // push

    while (ai != 0 || bj != 0) {
      string memory currentRuleId;

      // peek start
      if (bj != 0) {
        currentRuleId = B[bj - 1];
      } else {
        while (ai > 0) {
          B[bj++] = A[--ai];
        }
        currentRuleId = B[bj - 1];
      }
      // peek end

      bj--; // pop

      bool isSuspended = false;

      string memory ruleType = graph[currentRuleId].logicType;

      if (
        keccak256(bytes(ruleType)) == keccak256(bytes('END'))
      ) isSuspended = true;
      else if (keccak256(bytes(ruleType)) == keccak256(bytes('SIGN'))) {
        if(keccak256(bytes(graph[currentRuleId].id)) == keccak256(bytes(ruleId)))
          isSuspended = true;
        else if(canReject(applicationId, ruleId))
          applications[applicationId][ruleId].nodeStatus = NodeStatus.SUSPENDED;
      } else isSuspended = canReject(applicationId, ruleId);

      if (!isSuspended) continue;

      if(keccak256(bytes(graph[currentRuleId].id)) == keccak256(bytes(ruleId)))
        applications[applicationId][ruleId].nodeStatus = NodeStatus.REJECTED;
      else
        applications[applicationId][ruleId].nodeStatus = NodeStatus.SUSPENDED;

      for (uint i = 0; i < graph[currentRuleId].dependents.length; i++) {
        string memory nextRuleId = graph[currentRuleId].dependents[i];

        applications[applicationId][nextRuleId].requiredRejections--;

        if (canReject(applicationId, nextRuleId))
          A[ai++] = nextRuleId;
      }
    }
  }
}
