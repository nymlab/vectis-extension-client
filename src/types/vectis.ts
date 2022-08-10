export interface KeyInfo {
  name: string;
  address: string;
  isNanoLedger: boolean;
  isSCWallet: boolean;
  algo: 'secp256k1';
  // SCWallets use owner pubkey
  pubkey: Uint8Array;
}

export interface ChainInfo {
  readonly rpcUrl: string;
  readonly restUrl: string;
  readonly addressPrefix: string;
  readonly chainId: string;
  readonly chainName: string;
  readonly feeToken: string;
  readonly stakingToken: string;
  readonly gasPrice: number;
}
