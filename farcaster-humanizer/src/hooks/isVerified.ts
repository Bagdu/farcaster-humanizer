import { viemConnector } from '../ethereum/viemConnector';

export type UseVerifiedArgs =  {
  rpcUrl?: string
};

export function useVerified(args: UseVerifiedArgs) {
  const { isVerified } = viemConnector({rpcUrl: args.rpcUrl})
  return { isVerified };
}
