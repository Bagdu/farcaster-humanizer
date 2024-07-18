// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

contract WorldIDMock {
    constructor() {
    }

    function verifyProof(
        uint256 root,
        uint256 groupId,
        uint256 signalHash,
        uint256 nullifierHash,
        uint256 externalNullifierHash,
        uint256[8] calldata proof
    ) external {

    }
}
