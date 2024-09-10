import {prepareWriteContract, readContract, waitForTransaction, writeContract} from '@wagmi/core';
import {abis, addresses} from '../contracts';
import {decodeAbiParameters} from 'viem';

export const verifyProof = async (result: any, fid: number) => {
  const [unpackedProof] = decodeAbiParameters([{ type: 'uint256[8]' }], result.proof);

  const args = [fid, result.merkle_root, result.nullifier_hash, unpackedProof];

  const config = await prepareWriteContract({
    address: addresses.verify,
    abi: abis.verify,
    functionName: 'verify',
    args,
  });

  const { hash } = await writeContract(config);
  await waitForTransaction({ hash });
};

export const checkVerifyProof = async (fid: number) => {

  return await readContract({
    address: addresses.verify,
    abi: abis.verify,
    functionName: 'isVerified',
    args: [fid]
  });
};
