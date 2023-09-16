import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { StdFee } from '@cosmjs/amino';
import { DeliverTxResponse, GasPrice } from '@cosmjs/stargate';
import { OfflineSigner, EncodeObject, OfflineDirectSigner, encodePubkey, makeAuthInfoBytes, makeSignDoc } from '@cosmjs/proto-signing';
import { VectisAccountData } from '../types';

interface CosmWasmVectisExtension extends SigningCosmWasmClient {
  _signer: OfflineDirectSigner;
  _gasPrice: GasPrice;
  _signAndBroadcast: SigningCosmWasmClient['signAndBroadcast'];
}

export function setupWithVectisExtension(client: SigningCosmWasmClient): SigningCosmWasmClient & CosmWasmVectisExtension {
  const cwclient = Object.assign(client, {
    _signAndBroadcast: client.signAndBroadcast,
    // @ts-expect-error
    _signer: client.signer as OfflineSigner,
    // @ts-expect-error
    _gasPrice: client.gasPrice as GasPrice,
    async signAndBroadcast(
      signerAddress: string,
      messages: readonly EncodeObject[],
      fee: StdFee | 'auto' | number,
      memo = ''
    ): Promise<DeliverTxResponse> {
      const [{ type, pubkey: rawPubKey }] = (await this._signer.getAccounts()) as unknown as VectisAccountData[];
      if (!['ica'].includes(type)) return await this._signAndBroadcast(signerAddress, messages, fee, memo);
      this._gasPrice.denom;

      const pubkey = encodePubkey({
        type: 'tendermint/PubKeySecp256k1',
        value: btoa(String.fromCharCode(...(rawPubKey as unknown as Uint8Array)))
      });

      const txBody = {
        typeUrl: '/cosmos.tx.v1beta1.TxBody',
        value: {
          messages: messages,
          memo: memo
        }
      };

      const txBodyBytes = this.registry.encode(txBody);
      const chainId = await this.getChainId();
      const granter = typeof fee === 'object' ? fee.granter : undefined;
      const payer = typeof fee === 'object' ? fee.payer : undefined;

      const authInfoBytes = makeAuthInfoBytes([{ pubkey, sequence: 0 }], [{ denom: this._gasPrice.denom, amount: '0' }], 0, granter, payer);
      const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, 0);
      return (await this._signer.signDirect(signerAddress, signDoc)) as unknown as DeliverTxResponse;
    }
  } as SigningCosmWasmClient & CosmWasmVectisExtension);
  return cwclient;
}
