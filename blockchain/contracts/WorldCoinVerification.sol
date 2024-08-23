import { ByteHasher } from './libs/ByteHasher.sol';
import { IWorldIDGroups } from './interfaces/IWorldID.sol';

// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract WorldCoinVerification {
    using ByteHasher for bytes;

    /// @notice Emitted when a profile is verified
    /// @param fid The ID of the profile getting verified
    event ProfileVerified(uint256 indexed fid);

    /// @dev The World ID instance that will be used for verifying proofs
    IWorldIDGroups public immutable worldId;

    /// @dev The World ID group ID (always `1`)
    uint256 internal immutable groupId = 1;

    /// @dev The World ID external nullifier hash
    uint256 internal immutable externalNullifierHash;

    /// @notice Whether a profile address is verified
    mapping(uint256 => bool) public isVerified;

    /// @dev Connection between nullifiers and profiles. Used to correctly unverify the past profile when re-verifying.
    mapping(uint256 => uint256) internal nullifierHashes;

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
    /// @param fid farcaster user id
    /// @param root The root of the Merkle tree (returned by the JS SDK).
    /// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
    /// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
    function verify(
        uint256 fid,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public {
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(fid).hashToField(),
            nullifierHash,
            externalNullifierHash,
            proof
        );

        require(
            nullifierHashes[nullifierHash] == 0,
            "WorldCoinVerification: World id user has already verified the farcaster");

        require(
            !isVerified[fid],
            "WorldCoinVerification: Provided FID was already verified");

        isVerified[fid] = true;
        nullifierHashes[nullifierHash] = fid;

        emit ProfileVerified(fid);
    }}
