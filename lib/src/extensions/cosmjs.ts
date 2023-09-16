import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { StdFee } from '@cosmjs/amino';
import { DeliverTxResponse, GasPrice, SignerData, calculateFee } from '@cosmjs/stargate';
import { OfflineSigner, EncodeObject } from '@cosmjs/proto-signing';
import { assertDefined } from '@cosmjs/utils';
import { TxRaw } from '../types/cosmos';
import { VectisAccountData } from '../types';

interface CosmWasmVectisExtension extends SigningCosmWasmClient {
  _signer: OfflineSigner;
  _gasPrice: GasPrice;
  _signAndBroadcast: SigningCosmWasmClient['signAndBroadcast'];
  _sign: SigningCosmWasmClient['sign'];
  _simulate: SigningCosmWasmClient['simulate'];
  _signDirect: (
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    { accountNumber, sequence, chainId }: SignerData
  ) => Promise<TxRaw>;
}

export function setupWithVectisExtension(client: SigningCosmWasmClient): SigningCosmWasmClient & CosmWasmVectisExtension {
  const cwclient = Object.assign(client, {
    _signAndBroadcast: client.signAndBroadcast,
    _simulate: client.simulate,
    _sign: client.sign,
    // @ts-expect-error
    _signDirect: client.signDirect,
    // @ts-expect-error
    _signer: client.signer as OfflineSigner,
    // @ts-expect-error
    _gasPrice: client.gasPrice as GasPrice,
    async simulate(signerAddress: string, messages: readonly EncodeObject[], memo = ''): Promise<number> {
      const [{ type }] = (await this._signer.getAccounts()) as unknown as VectisAccountData[];
      if (!['vectis', 'ica'].includes(type)) return await this._simulate(signerAddress, messages, memo);
      return Promise.resolve(0);
    },
    async signAndBroadcast(
      signerAddress: string,
      messages: readonly EncodeObject[],
      fee: StdFee | 'auto' | number,
      memo = ''
    ): Promise<DeliverTxResponse> {
      const [{ type }] = (await this._signer.getAccounts()) as unknown as VectisAccountData[];
      if (!['vectis', 'ica'].includes(type)) return await this._signAndBroadcast(signerAddress, messages, fee, memo);
      let usedFee: StdFee;
      if (fee == 'auto' || typeof fee === 'number') {
        assertDefined(this._gasPrice, 'Gas price must be set in the client options when auto gas is used.');
        const gasEstimation = await this.simulate(signerAddress, messages, memo);
        // Starting with Cosmos SDK 0.47, we see many cases in which 1.3 is not enough anymore
        // E.g. https://github.com/cosmos/cosmos-sdk/issues/16020
        const multiplier = typeof fee === 'number' ? fee : 1.4;
        usedFee = calculateFee(Math.round(gasEstimation * multiplier), this._gasPrice);
      } else {
        usedFee = fee;
      }
      const txDelivered = (await this.sign(signerAddress, messages, usedFee, memo)) as unknown as DeliverTxResponse;
      return txDelivered;
    },
    async sign(
      signerAddress: string,
      messages: readonly EncodeObject[],
      fee: StdFee,
      memo: string,
      explicitSignerData?: SignerData
    ): Promise<TxRaw> {
      const [{ type }] = (await this._signer.getAccounts()) as unknown as VectisAccountData[];
      if (!['vectis', 'ica'].includes(type)) return await this._sign(signerAddress, messages, fee, memo, explicitSignerData);
      let signerData: SignerData;
      if (explicitSignerData) {
        signerData = explicitSignerData;
      } else {
        const chainId = await this.getChainId();
        signerData = {
          accountNumber: 0,
          sequence: 0,
          chainId: chainId
        };
      }
      return this._signDirect(signerAddress, messages, fee, memo, signerData);
    }
  } as SigningCosmWasmClient & CosmWasmVectisExtension);
  return cwclient;
}
