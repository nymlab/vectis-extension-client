import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { GasPrice } from '@cosmjs/stargate';
import { OfflineDirectSigner } from '@cosmjs/proto-signing';
interface CosmWasmVectisExtension extends SigningCosmWasmClient {
    _signer: OfflineDirectSigner;
    _gasPrice: GasPrice;
    _signAndBroadcast: SigningCosmWasmClient['signAndBroadcast'];
}
export declare function setupWithVectisExtension(client: SigningCosmWasmClient): SigningCosmWasmClient & CosmWasmVectisExtension;
export {};
//# sourceMappingURL=cosmjs.d.ts.map