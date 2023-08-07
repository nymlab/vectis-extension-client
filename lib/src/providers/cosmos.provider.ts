import {
  AccountData,
  AminoSignResponse,
  DirectSignResponse,
  OfflineSigner,
  OfflineAminoSigner,
  OfflineDirectSigner,
  SignDoc,
  StdSignDoc
} from '../types/cosmos';
import { KeyInfo, CosmosProvider } from '../types';

export class VectisCosmosProvider {
  getClient(): CosmosProvider {
    if (window.vectis?.cosmos) return window.vectis.cosmos;
    throw new Error('Vectis is not installed');
  }

  async enable(chainId: string): Promise<void> {
    await this.getClient().enable(chainId);
  }

  async getKey(chainId: string): Promise<KeyInfo> {
    return await this.getClient().getKey(chainId);
  }

  async getAccount(chainId: string): Promise<AccountData[]> {
    return await this.getClient().getAccounts(chainId);
  }

  async signAmino(signerAddress: string, doc: StdSignDoc): Promise<AminoSignResponse> {
    return await this.getClient().signAmino(signerAddress, doc);
  }

  async signDirect(signerAddress: string, doc: SignDoc): Promise<DirectSignResponse> {
    return await this.getClient().signDirect(signerAddress, doc);
  }

  async getOfflineSignerAuto(chainId: string): Promise<OfflineSigner> {
    return await this.getClient().getOfflineSignerAuto(chainId);
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

  onAccountChange(handler: EventListener): void {
    window.addEventListener('vectis_accountChanged', handler);
  }

  offAccountChange(handler: EventListener): void {
    window.removeEventListener('vectis_accountChanged', handler);
  }
}
