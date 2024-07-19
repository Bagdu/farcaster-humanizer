import _addresses from './addresses.json';
import verifyAbi from './abis/verify.json';

export const abis = {
  verify: verifyAbi as any,
};

export const addresses: {[key: string]: `0x${string}`} = _addresses as any;
