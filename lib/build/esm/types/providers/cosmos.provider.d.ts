import { AminoSignResponse, DirectSignResponse, OfflineSigner, OfflineAminoSigner, OfflineDirectSigner, SignDoc, StdSignDoc } from '../types/cosmos';
import { AccountInfo, CosmosProvider } from '../types';
export declare class VectisCosmosProvider {
    getClient(): CosmosProvider;
    enable(chainId: string): Promise<void>;
    getAccount(chainId: string): Promise<AccountInfo>;
    getAccounts(chainId: string): Promise<AccountInfo[]>;
    signAmino(signerAddress: string, doc: StdSignDoc): Promise<AminoSignResponse>;
    signDirect(signerAddress: string, doc: SignDoc): Promise<DirectSignResponse>;
    getOfflineSignerAmino(chainId: string): OfflineAminoSigner;
    getOfflineSignerDirect(chainId: string): OfflineDirectSigner;
    getOfflineSigner(chainId: string): OfflineSigner;
}
//# sourceMappingURL=cosmos.provider.d.ts.map