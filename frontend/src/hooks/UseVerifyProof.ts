import {prepareWriteContract, readContract, waitForTransaction, writeContract} from '@wagmi/core';
import {abis, addresses} from '../contracts';
import {decodeAbiParameters} from 'viem';
import {useAccount} from "wagmi";

export function useVerifyProof() {
  const {address} = useAccount();
  const verifyProof = async (result: any, fid: string) => {
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

  const checkVerifyProof = async (fid: string) => {

    return await readContract({
      address: addresses.verify,
      abi: abis.verify,
      functionName: 'isVerified',
      args: [fid]
    });
  };

  return { verifyProof, checkVerifyProof };
}

export default useVerifyProof;
