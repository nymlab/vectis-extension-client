import { AccountData, AminoSignResponse, DirectSignResponse, OfflineSigner, OfflineAminoSigner, OfflineDirectSigner, SignDoc, StdSignDoc } from '../types/cosmos';
import { KeyInfo, CosmosProvider } from '../types';
export declare class VectisCosmosProvider {
    getClient(): CosmosProvider;
    enable(chainId: string): Promise<void>;
    getKey(chainId: string): Promise<KeyInfo>;
    getAccount(chainId: string): Promise<AccountData[]>;
    signAmino(signerAddress: string, doc: StdSignDoc): Promise<AminoSignResponse>;
    signDirect(signerAddress: string, doc: SignDoc): Promise<DirectSignResponse>;
    getOfflineSignerAuto(chainId: string): Promise<OfflineSigner>;
    getOfflineSignerAmino(chainId: string): OfflineAminoSigner;
    getOfflineSignerDirect(chainId: string): OfflineDirectSigner;
    getOfflineSigner(chainId: string): OfflineSigner;
    onAccountChange(handler: EventListener): void;
    offAccountChange(handler: EventListener): void;
}
//# sourceMappingURL=cosmos.provider.d.ts.map