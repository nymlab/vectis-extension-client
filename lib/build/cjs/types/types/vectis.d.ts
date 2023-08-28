import { AminoSignResponse, DirectSignResponse, OfflineAminoSigner, OfflineDirectSigner, OfflineSigner, SignDoc, StdSignDoc, Algo } from './cosmos';
export interface AccountInfo {
    algo: Algo;
    name: string;
    pubkey: Uint8Array;
    address: string;
    isVectisAccount: boolean;
}
export interface CosmosProvider {
    enable(chainId: string): Promise<void>;
    getAccount(chainId: string): Promise<AccountInfo>;
    getAccounts(chainId: string): Promise<AccountInfo[]>;
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