import { readContract, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core';
import { abis, addresses } from '../contracts';
import { decodeAbiParameters } from 'viem';
import { useAccount } from "wagmi";

function useVerifyProof() {
  const {address} = useAccount();
  const verifyProof = async (result: any) => {
    const signal = address;
    const [unpackedProof] = decodeAbiParameters([{ type: 'uint256[8]' }], result.proof);

    const args = [signal, result.merkle_root, result.nullifier_hash, unpackedProof];


    const config = await prepareWriteContract({
      address: addresses.verify,
      abi: abis.verify,
      functionName: 'verify',
      args,
    });

    const { hash } = await writeContract(config);
    await waitForTransaction({ hash });
  };

  return { verifyProof };
}

export default useVerifyProof;
