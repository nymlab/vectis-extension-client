import {
  AminoSignResponse,
  DirectSignResponse,
  OfflineSigner,
  OfflineAminoSigner,
  OfflineDirectSigner,
  SignDoc,
  StdSignDoc
} from '../types/cosmos';
import { AccountInfo, CosmosProvider } from '../types';

export class VectisCosmosProvider {
  getClient(): CosmosProvider {
    if (window.vectis?.cosmos) return window.vectis.cosmos;
    throw new Error('Vectis is not installed');
  }

  async enable(chainId: string): Promise<void> {
    await this.getClient().enable(chainId);
  }

  async getAccount(chainId: string): Promise<AccountInfo> {
    return await this.getClient().getAccount(chainId);
  }

  async getAccounts(chainId: string): Promise<AccountInfo[]> {
    return await this.getClient().getAccounts(chainId);
  }

  async signAmino(signerAddress: string, doc: StdSignDoc): Promise<AminoSignResponse> {
    return await this.getClient().signAmino(signerAddress, doc);
  }

  async signDirect(signerAddress: string, doc: SignDoc): Promise<DirectSignResponse> {
    return await this.getClient().signDirect(signerAddress, doc);
  }

  getOfflineSignerAmino(chainId: string): OfflineAminoSigner {
    return this.getClient().getOfflineSignerAmino(chainId);
  }

  getOfflineSignerDirect(chainId: string): OfflineDirectSigner {
    return this.getClient().getOfflineSignerDirect(chainId);
  }

  getOfflineSigner(chainId: string): OfflineSigner {
    return this.getClient().getOfflineSigner(chainId);
  }
}
