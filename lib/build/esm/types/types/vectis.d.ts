import { AminoSignResponse, DirectSignResponse, OfflineAminoSigner, OfflineDirectSigner, OfflineSigner, SignDoc, StdSignDoc, Algo } from './cosmos';
export type AccountType = 'vectis' | 'ica' | 'eoa';
export interface VectisAccountData<T = 'vectis'> {
    algo: T extends 'eoa' ? Algo : null;
    name: string;
    pubkey: T extends 'eoa' ? Uint8Array : null;
    address: string;
    type: AccountType;
}
export interface CosmosProvider {
    enable(chainId: string): Promise<void>;
    getAccount(chainId: string): Promise<VectisAccountData>;
    getAccounts(chainId: string): Promise<VectisAccountData[]>;
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
//# sourceMappingURL=vectis.d.ts.map