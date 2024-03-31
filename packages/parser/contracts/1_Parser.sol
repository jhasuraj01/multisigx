// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract GraphContract {

    enum NodeStatus {
        APPROVED,
        REJECTED,
        INACTIVE
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
        int count;
        NodeStatus nodeStatus;
    }

    uint public n;

    mapping(string => Node) public graph;
    mapping(string => mapping(string => DynamicNodeData)) public applications;

    string[] ruleIds;

    constructor(string[] memory ids, string[] memory names, string[][] memory dependentsArray, string[][] memory dependsOnArray, string[] memory types, string[] memory internalLogicArray, string[] memory addressArray, int[] memory thresholdArray) {
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
        for(uint i = 0; i < n; i++) {
            applications[applicationId][ruleIds[i]] = DynamicNodeData(
                ruleIds[i],
                graph[ruleIds[i]].threshold,
                NodeStatus.INACTIVE
            );
        }
        bfs(applicationId, "start");
    }

    function getStatus(string memory applicationId) public view returns (DynamicNodeData[] memory) {
        DynamicNodeData[] memory ans = new DynamicNodeData[](n);
        for(uint i=0;i<n;i++) {
            ans[i] = applications[applicationId][ruleIds[i]];
        }
        return ans;
    }

    function canApprove (string memory applicationId, string memory ruleId) internal view returns (bool) {
        return applications[applicationId][ruleId].count == 0;
    }

    // add sign
    function sign(string memory applicationId, string memory ruleId) public {
        require(keccak256(bytes(graph[ruleId].logicType)) == keccak256(bytes("START")), "Not a sign Rule");
        require(graph[ruleId]._address == msg.sender, "Unauthorized to Sign");
        require(applications[applicationId][ruleId].nodeStatus == NodeStatus.INACTIVE, "Already signed/rejected");
        require(canApprove(applicationId, ruleId), "Can't sign yet");

        applications[applicationId][ruleId].nodeStatus = NodeStatus.APPROVED; // accepted

        bfs(applicationId, ruleId);
    }

    function bfs(string memory applicationId, string memory ruleId) internal {
        string[] memory A = new string[](n);
        string[] memory B = new string[](n);
        uint ai = 0;
        uint bj = 0;
        
        A[ai++] = ruleId; // push
        
        while(ai != 0 || bj != 0) {
            string memory currentRuleId;

            // peek start
            if (bj != 0) {
                currentRuleId = B[bj-1];
            } else {
                while (ai > 0) {
                    B[bj++] = A[--ai];
                }
                currentRuleId = B[bj-1];
            }
            // peek end
            
            bj--; // pop
            
            bool isApproved = false;

            string memory ruleType = graph[currentRuleId].logicType;

            if(keccak256(bytes(ruleType)) == keccak256(bytes("START")) || keccak256(bytes(ruleType)) == keccak256(bytes("END")))
                isApproved = true;
            else if(keccak256(bytes(ruleType)) == keccak256(bytes("SIGN"))) // only approve source signatory
                isApproved = keccak256(bytes(graph[currentRuleId].id)) == keccak256(bytes(ruleId));
            else
                isApproved = canApprove(applicationId, ruleId);

            if(!isApproved)
                continue;

            applications[applicationId][ruleId].nodeStatus = NodeStatus.APPROVED;

            for(uint i = 0; i < graph[currentRuleId].dependents.length; i++) {
                string memory nextRuleId = graph[currentRuleId].dependents[i];

                applications[applicationId][nextRuleId].count--;

                if(applications[applicationId][nextRuleId].count == 0)
                    A[ai++] = nextRuleId;
            }
        }
    }
}