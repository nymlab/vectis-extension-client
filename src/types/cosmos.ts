import { OfflineDirectSigner, OfflineSigner, AccountData, DirectSignResponse } from '@cosmjs/proto-signing';
import { AminoSignResponse, StdSignDoc, OfflineAminoSigner } from '@cosmjs/amino';
import { SignDoc } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { ChainInfo, KeyInfo } from './vectis';

export interface CosmosProvider {
  suggestChains(chainsInfo: ChainInfo[]): Promise<void>;
  enable(chainIds: string | string[]): Promise<void>;
  getSupportedChains(): Promise<ChainInfo[]>;
  getKey(chainId: string): Promise<KeyInfo>;
  getAccounts(chainId: string): Promise<AccountData[]>;
  signAmino(signerAddress: string, doc: StdSignDoc): Promise<AminoSignResponse>;
  signDirect(signerAddress: string, doc: SignDoc): Promise<DirectSignResponse>;
  getOfflineSignerAmino(chainId: string): OfflineAminoSigner;
  getOfflineSignerDirect(chainId: string): OfflineDirectSigner;
  getOfflineSigner(chainId: string): OfflineSigner;
}
