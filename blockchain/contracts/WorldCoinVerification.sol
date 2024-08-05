import { ByteHasher } from './libs/ByteHasher.sol';
import { IWorldIDGroups } from './interfaces/IWorldID.sol';

// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

// Uncomment this line to use console.log
//import "hardhat/console.sol";

contract WorldCoinVerification {
    using ByteHasher for bytes;

    /// @notice Emitted when a profile is verified
    /// @param profileAddress The ID of the profile getting verified
    event ProfileVerified(string indexed farcasterAppId, address indexed profileAddress);

    /// @notice Emitted when a profileAddress is unverified
    /// @param profileAddress The ID of the profile no longer verified
    event ProfileUnverified(address indexed profileAddress);

    /// @dev The World ID instance that will be used for verifying proofs
    IWorldIDGroups public immutable worldId;

    /// @dev The World ID group ID (always `1`)
    uint256 internal immutable groupId = 1;

    /// @dev The World ID external nullifier hash
    uint256 internal immutable externalNullifierHash;

    /// @notice Whether a profile address is verified
    mapping(string => mapping(address => bool)) public isVerified;

    /// @dev Connection between nullifiers and profiles. Used to correctly unverify the past profile when re-verifying.
    mapping(string => mapping(uint256 => address)) internal nullifierHashes;

    /// @param _worldId The WorldID instance that will verify the proofs
    /// @param _appId The World ID App ID (from Developer Portal)
    /// @param _action The World ID action
    constructor(IWorldIDGroups _worldId, string memory _appId, string memory _action) {
        worldId = _worldId;
        externalNullifierHash = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _action)
            .hashToField();
    }

    /// @notice Verify a farcaster user profile
    /// @param signal signal for the proof
    /// @param farcasterAppId farcaster application id
    /// @param profileAddress farcaster profile address to be verified
    /// @param root The root of the Merkle tree (returned by the JS SDK).
    /// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
    /// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
    function verify(
        string calldata signal,
        string calldata farcasterAppId,
        address profileAddress,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public {
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifierHash,
            proof
        );

        /**
        if (nullifierHashes[nullifierHash] != 0) {
            uint256 prevProfileAddress = nullifierHashes[nullifierHash];
            isVerified[prevProfileAddress] = false;
            emit ProfileUnverified(prevProfileAddress);
        }*/

        require(
            nullifierHashes[farcasterAppId][nullifierHash] == address(0),
            "WorldCoinVerification: World id user has already verified the farcaster");

        isVerified[farcasterAppId][profileAddress] = true;
        nullifierHashes[farcasterAppId][nullifierHash] = profileAddress;

        emit ProfileVerified(farcasterAppId, profileAddress);
    }}
