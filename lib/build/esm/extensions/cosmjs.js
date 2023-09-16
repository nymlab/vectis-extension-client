import { calculateFee } from '@cosmjs/stargate';
import { assertDefined } from '@cosmjs/utils';
export function setupWithVectisExtension(client) {
    const cwclient = Object.assign(client, {
        _signAndBroadcast: client.signAndBroadcast,
        _simulate: client.simulate,
        _sign: client.sign,
        // @ts-expect-error
        _signDirect: client.signDirect,
        // @ts-expect-error
        _signer: client.signer,
        // @ts-expect-error
        _gasPrice: client.gasPrice,
        async simulate(signerAddress, messages, memo = '') {
            const [{ type }] = (await this._signer.getAccounts());
            if (!['vectis', 'ica'].includes(type))
                return await this._simulate(signerAddress, messages, memo);
            return Promise.resolve(0);
        },
        async signAndBroadcast(signerAddress, messages, fee, memo = '') {
            const [{ type }] = (await this._signer.getAccounts());
            if (!['vectis', 'ica'].includes(type))
                return await this._signAndBroadcast(signerAddress, messages, fee, memo);
            let usedFee;
            if (fee == 'auto' || typeof fee === 'number') {
                assertDefined(this._gasPrice, 'Gas price must be set in the client options when auto gas is used.');
                const gasEstimation = await this.simulate(signerAddress, messages, memo);
                // Starting with Cosmos SDK 0.47, we see many cases in which 1.3 is not enough anymore
                // E.g. https://github.com/cosmos/cosmos-sdk/issues/16020
                const multiplier = typeof fee === 'number' ? fee : 1.4;
                usedFee = calculateFee(Math.round(gasEstimation * multiplier), this._gasPrice);
            }
            else {
                usedFee = fee;
            }
            const txDelivered = (await this.sign(signerAddress, messages, usedFee, memo));
            return txDelivered;
        },
        async sign(signerAddress, messages, fee, memo, explicitSignerData) {
            const [{ type }] = (await this._signer.getAccounts());
            if (!['vectis', 'ica'].includes(type))
                return await this._sign(signerAddress, messages, fee, memo, explicitSignerData);
            let signerData;
            if (explicitSignerData) {
                signerData = explicitSignerData;
            }
            else {
                const chainId = await this.getChainId();
                signerData = {
                    accountNumber: 0,
                    sequence: 0,
                    chainId: chainId
                };
            }
            return this._signDirect(signerAddress, messages, fee, memo, signerData);
        }
    });
    return cwclient;
}
