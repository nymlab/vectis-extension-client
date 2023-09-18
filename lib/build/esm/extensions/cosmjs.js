import { encodePubkey, makeAuthInfoBytes, makeSignDoc } from '@cosmjs/proto-signing';
export function setupWithVectisExtension(client) {
    const cwclient = Object.assign(client, {
        _signAndBroadcast: client.signAndBroadcast,
        // @ts-expect-error
        _signer: client.signer,
        // @ts-expect-error
        _gasPrice: client.gasPrice,
        async signAndBroadcast(signerAddress, messages, fee, memo = '') {
            const [{ type, pubkey: rawPubKey }] = (await this._signer.getAccounts());
            if (!['ica'].includes(type))
                return await this._signAndBroadcast(signerAddress, messages, fee, memo);
            this._gasPrice.denom;
            const pubkey = encodePubkey({
                type: 'tendermint/PubKeySecp256k1',
                value: btoa(String.fromCharCode(...rawPubKey))
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
            return (await this._signer.signDirect(signerAddress, signDoc));
        }
    });
    return cwclient;
}
