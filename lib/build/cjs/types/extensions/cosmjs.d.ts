import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { StdFee } from '@cosmjs/amino';
import { GasPrice, SignerData } from '@cosmjs/stargate';
import { OfflineSigner, EncodeObject } from '@cosmjs/proto-signing';
import { TxRaw } from '../types/cosmos';
interface CosmWasmVectisExtension extends SigningCosmWasmClient {
    _signer: OfflineSigner;
    _gasPrice: GasPrice;
    _signAndBroadcast: SigningCosmWasmClient['signAndBroadcast'];
    _sign: SigningCosmWasmClient['sign'];
    _simulate: SigningCosmWasmClient['simulate'];
    _signDirect: (signerAddress: string, messages: readonly EncodeObject[], fee: StdFee, memo: string, { accountNumber, sequence, chainId }: SignerData) => Promise<TxRaw>;
}
export declare function setupWithVectisExtension(client: SigningCosmWasmClient): SigningCosmWasmClient & CosmWasmVectisExtension;
export {};
//# sourceMappingURL=cosmjs.d.ts.map