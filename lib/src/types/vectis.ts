import {
  AccountData,
  AminoSignResponse,
  DirectSignResponse,
  OfflineAminoSigner,
  OfflineDirectSigner,
  OfflineSigner,
  SignDoc,
  StdSignDoc,
  Algo
} from './cosmos';

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
  enable(chainId: string): Promise<void>;
  getKey(chainId: string): Promise<KeyInfo>;
  getAccounts(chainId: string): Promise<AccountData[]>;
  signAmino(signerAddress: string, doc: StdSignDoc): Promise<AminoSignResponse>;
  signDirect(signerAddress: string, doc: SignDoc): Promise<DirectSignResponse>;
  getOfflineSignerAmino(chainId: string): OfflineAminoSigner;
  getOfflineSignerDirect(chainId: string): OfflineDirectSigner;
  getOfflineSigner(chainId: string): OfflineSigner;
  /**
   * Detect what signer should use based on the key type
   * Ex: Nano ledger only supports amino signing.
   */
  getOfflineSignerAuto(chainId: string): Promise<OfflineSigner>;
}
