import {
  AccountData,
  AminoSignResponse,
  DirectSignResponse,
  OfflineAminoSigner,
  OfflineDirectSigner,
  OfflineSigner,
  SignDoc,
  StdSignDoc,
  StdSignature
} from './cosmos';

type Algo = 'secp256k1' | 'ethsecp256k1';
export interface KeyInfo {
  algo: Algo;
  name: string;
  // Vectis accounts use controller pub key
  pubKey: Uint8Array;
  address: string;
  isNanoLedger: boolean;
  isVectisAccount: boolean;
}

export interface CosmosProvider {
  suggestChains(chainsInfo: ChainInfo[]): Promise<void>;
  enable(chainIds: string | string[]): Promise<void>;
  getSupportedChains(): Promise<ChainInfo[]>;
  getKey(chainId: string): Promise<KeyInfo>;
  getAccounts(chainId: string): Promise<AccountData[]>;
  signAmino(signerAddress: string, doc: StdSignDoc): Promise<AminoSignResponse>;
  signDirect(signerAddress: string, doc: SignDoc): Promise<DirectSignResponse>;
  signArbitrary(chainId: string, signerAddress: string, message: string | Uint8Array): Promise<AminoSignResponse>;
  verifyArbitrary(chainId: string, signerAddress: string, message: string | Uint8Array, signature: StdSignature): Promise<boolean>;
  getOfflineSignerAmino(chainId: string): OfflineAminoSigner;
  getOfflineSignerDirect(chainId: string): OfflineDirectSigner;
  getOfflineSigner(chainId: string): OfflineSigner;
  /**
   * Detect what signer should use based on the key type
   * Ex: Nano ledger only supports amino signing.
   */
  getOfflineSignerAuto(chainId: string): Promise<OfflineAminoSigner | OfflineDirectSigner>;
}

export interface ChainInfo {
  readonly rpcUrl: string;
  readonly restUrl: string;
  readonly chainId: string;
  readonly chainName: string;
  readonly prettyName: string;
  readonly bech32Prefix: string;
  readonly bip44: {
    readonly coinType: number;
  };
  readonly currencies: AppCurrency[];
  readonly stakeCurrency: Currency;
  readonly feeCurrencies: FeeCurrency[];
  readonly features?: string[];
  readonly isSuggested?: boolean;
  readonly ecosystem?: string;
}
export interface Currency {
  readonly coinDenom: string;
  readonly coinMinimalDenom: string;
  readonly coinDecimals: number;
  readonly coinGeckoId?: string;
  readonly coinImageUrl?: string;
}

export interface CW20Currency extends Currency {
  readonly type: 'cw20';
  readonly contractAddress: string;
}

export interface IBCCurrency extends Currency {
  readonly paths: {
    portId: string;
    channelId: string;
  }[];
  readonly originChainId: string | undefined;
  readonly originCurrency: Currency | CW20Currency | undefined;
}

export type AppCurrency = Currency | CW20Currency | IBCCurrency;

export type FeeCurrency = WithGasPriceStep<AppCurrency>;

export type WithGasPriceStep<T> = T & {
  readonly gasPriceStep?: {
    readonly low: number;
    readonly average: number;
    readonly high: number;
  };
};
