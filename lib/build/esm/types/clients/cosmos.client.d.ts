import { AminoSignResponse, DirectSignResponse, OfflineSigner, OfflineAminoSigner, OfflineDirectSigner, SignDoc, StdSignDoc } from '../types/cosmos';
import { VectisAccountData, CosmosProvider } from '../types';
export declare class VectisCosmosClient {
    getClient(): CosmosProvider;
    enable(chainId: string): Promise<void>;
    getAccount(chainId: string): Promise<VectisAccountData>;
    getAccounts(chainId: string): Promise<VectisAccountData[]>;
    signAmino(signerAddress: string, doc: StdSignDoc): Promise<AminoSignResponse>;
    signDirect(signerAddress: string, doc: SignDoc): Promise<DirectSignResponse>;
    getOfflineSignerAmino(chainId: string): OfflineAminoSigner;
    getOfflineSignerDirect(chainId: string): OfflineDirectSigner;
    getOfflineSigner(chainId: string): OfflineSigner;
}
//# sourceMappingURL=cosmos.client.d.ts.map