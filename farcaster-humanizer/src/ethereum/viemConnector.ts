import { createPublicClient, http } from "viem";
import { optimism } from "viem/chains";
import {abis, addresses} from '../contracts';

export interface ViemConfigArgs {
  rpcUrl?: string;
}

export const viemConnector = (args?: ViemConfigArgs) => {
  const publicClient = createPublicClient({
    chain: optimism,
    transport: http(args?.rpcUrl),
  });

  const isVerified = async (fid: number): Promise<any> => {
    return publicClient.readContract({
      address: addresses.verify,
      abi: abis.verify,
      functionName: "isVerified",
      args: [fid],
    });
  };

  return {
    isVerified,
  };
};
