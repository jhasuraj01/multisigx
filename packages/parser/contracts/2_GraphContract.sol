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

  uint internal n;

  mapping(string => Node) internal graph;
  mapping(string => mapping(string => DynamicNodeData)) internal applications;

  string[] ruleIds;

  constructor(
    string[] memory ids,
    string[] memory names,
    string[][] memory dependentsArray,
    string[][] memory dependsOnArray,
    string[] memory types,
    string[] memory internalLogicArray,
    address[] memory addressArray,
    int[] memory thresholdArray
  ) {
    ruleIds = ids;
    n = ruleIds.length;
    for (uint i = 0; i < n; i++) {
      graph[ruleIds[i]] = Node(
        ruleIds[i],
        names[i],
        types[i],
        dependentsArray[i],
        dependsOnArray[i],
        internalLogicArray[i],
        addressArray[i],
        thresholdArray[i]
      );
    }
  }

  function createApplication(string memory applicationId) public {
    require(
      keccak256(bytes(applications[applicationId][ruleIds[0]].id)) ==
        keccak256(bytes("")),
      "Application Id already exists"
    );
    for (uint i = 0; i < n; i++) {
      applications[applicationId][ruleIds[i]] = DynamicNodeData(
        ruleIds[i],
        graph[ruleIds[i]].threshold,
        int(graph[ruleIds[i]].dependsOn.length) -
          graph[ruleIds[i]].threshold +
          1,
        NodeStatus.INACTIVE
      );
    }
    bfsApprove(applicationId, "start");
  }

  function getApplication(
    string memory applicationId
  ) public view returns (DynamicNodeData[] memory) {
    require(
      keccak256(bytes(applications[applicationId][ruleIds[0]].id)) !=
        keccak256(bytes("")),
      "Application Id does not exist"
    );
    DynamicNodeData[] memory ans = new DynamicNodeData[](n);
    for (uint i = 0; i < n; i++) {
      ans[i] = applications[applicationId][ruleIds[i]];
    }
    return ans;
  }

  function canSign(
    string memory applicationId,
    string memory ruleId
  ) internal view returns (bool) {
    return applications[applicationId][ruleId].requiredApprovals <= 0;
  }

  function canSuspend(
    string memory applicationId,
    string memory ruleId
  ) internal view returns (bool) {
    return applications[applicationId][ruleId].requiredRejections <= 0;
  }

  // add sign
  function sign(string memory applicationId, string memory ruleId) public {
    require(
      keccak256(bytes(graph[ruleId].logicType)) == keccak256(bytes("SIGN")),
      "Not a Sign rule."
    );
    require(
      graph[ruleId]._address == msg.sender,
      "Unauthorized to Sign."
    );
    require(canSign(applicationId, ruleId), "Cant sign yet");
    require(
      applications[applicationId][ruleId].nodeStatus == NodeStatus.PENDING,
      "Already signed/rejected"
    );

    applications[applicationId][ruleId].nodeStatus = NodeStatus.APPROVED; // accepted

    bfsApprove(applicationId, ruleId);
  }

  function bfsApprove(
    string memory applicationId,
    string memory ruleId
  ) internal {
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
        keccak256(bytes(ruleType)) == keccak256(bytes("START")) ||
        keccak256(bytes(ruleType)) == keccak256(bytes("END"))
      ) isApproved = true;
      else if (keccak256(bytes(ruleType)) == keccak256(bytes("SIGN"))) {
        // only approve source signatory
        if (
          keccak256(bytes(graph[currentRuleId].id)) == keccak256(bytes(ruleId))
        ) isApproved = true;
        else if (canSign(applicationId, currentRuleId))
          applications[applicationId][currentRuleId].nodeStatus = NodeStatus
            .PENDING;
      } else isApproved = canSign(applicationId, currentRuleId);

      if (!isApproved) continue;

      applications[applicationId][currentRuleId].nodeStatus = NodeStatus
        .APPROVED;

      for (uint i = 0; i < graph[currentRuleId].dependents.length; i++) {
        string memory nextRuleId = graph[currentRuleId].dependents[i];

        applications[applicationId][nextRuleId].requiredApprovals--;

        if (canSign(applicationId, nextRuleId)) A[ai++] = nextRuleId;
      }
    }
  }

  function reject(string memory applicationId, string memory ruleId) public {
    require(
      keccak256(bytes(graph[ruleId].logicType)) == keccak256(bytes("SIGN")),
      "Not a sign Rule"
    );
    require(graph[ruleId]._address == msg.sender, "Unauthorized to Reject");
    require(canSign(applicationId, ruleId), "Cant Reject yet");
    require(
      applications[applicationId][ruleId].nodeStatus == NodeStatus.PENDING,
      "Already signed/rejected"
    );

    applications[applicationId][ruleId].nodeStatus = NodeStatus.REJECTED;

    bfsReject(applicationId, ruleId);
  }

  function bfsReject(
    string memory applicationId,
    string memory ruleId
  ) internal {
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

      if (keccak256(bytes(ruleType)) == keccak256(bytes("END")))
        isSuspended = true;
      else if (keccak256(bytes(ruleType)) == keccak256(bytes("SIGN"))) {
        if (
          keccak256(bytes(graph[currentRuleId].id)) == keccak256(bytes(ruleId)) || canSuspend(applicationId, currentRuleId)
        ) isSuspended = true;
      } else isSuspended = canSuspend(applicationId, currentRuleId);

      if (!isSuspended) continue;

      if (keccak256(bytes(graph[currentRuleId].id)) == keccak256(bytes(ruleId)))
        applications[applicationId][currentRuleId].nodeStatus = NodeStatus
          .REJECTED;
      else
        applications[applicationId][currentRuleId].nodeStatus = NodeStatus
          .SUSPENDED;

      for (uint i = 0; i < graph[currentRuleId].dependents.length; i++) {
        string memory nextRuleId = graph[currentRuleId].dependents[i];

        applications[applicationId][nextRuleId].requiredRejections--;

        if (canSuspend(applicationId, nextRuleId)) A[ai++] = nextRuleId;
      }
    }
  }

  function convertEnumToString(
    NodeStatus status
  ) internal pure returns (string memory) {
    if (status == NodeStatus.INACTIVE) return "INACTIVE";
    else if (status == NodeStatus.PENDING) return "PENDING";
    else if (status == NodeStatus.APPROVED) return "APPROVED";
    else if (status == NodeStatus.REJECTED) return "REJECTED";
    else return "SUSPENDED";
  }

  function getWorkflowStatus(
    string memory applicationId
  ) public view returns (string memory) {
    for (uint i = 0; i < n; i++) {
      if (
        keccak256(bytes(graph[ruleIds[i]].logicType)) == keccak256(bytes("END"))
      ) {
        return convertEnumToString(applications[applicationId][ruleIds[i]].nodeStatus);
      }
    }
    return convertEnumToString(NodeStatus.INACTIVE);
  }
}
