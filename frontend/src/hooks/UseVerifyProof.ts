import {prepareWriteContract, readContract, waitForTransaction, writeContract} from '@wagmi/core';
import {abis, addresses} from '../contracts';
import {decodeAbiParameters} from 'viem';
import {useAccount} from "wagmi";

export function useVerifyProof() {
  const {address} = useAccount();
  const verifyProof = async (result: any, farcasterAppId: string) => {
    const [unpackedProof] = decodeAbiParameters([{ type: 'uint256[8]' }], result.proof);

    const signal = farcasterAppId + address
    const args = [signal, farcasterAppId, address, result.merkle_root, result.nullifier_hash, unpackedProof];
    console.log(args)
    console.log(result)
    console.log(unpackedProof)
    console.log(farcasterAppId + address)

    const config = await prepareWriteContract({
      address: addresses.verify,
      abi: abis.verify,
      functionName: 'verify',
      args,
    });

    const { hash } = await writeContract(config);
    await waitForTransaction({ hash });
  };

  const checkVerifyProof = async (address: string) => {

    return await readContract({
      address: addresses.verify,
      abi: abis.verify,
      functionName: 'isVerified',
      args: [address]
    });
  };

  return { verifyProof, checkVerifyProof };
}

export default useVerifyProof;
