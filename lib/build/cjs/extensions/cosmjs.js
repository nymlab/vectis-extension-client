"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupWithVectisExtension = void 0;
const proto_signing_1 = require("@cosmjs/proto-signing");
function setupWithVectisExtension(client) {
    const cwclient = Object.assign(client, {
        _signAndBroadcast: client.signAndBroadcast,
        // @ts-expect-error
        _signer: client.signer,
        // @ts-expect-error
        _gasPrice: client.gasPrice,
        signAndBroadcast(signerAddress, messages, fee, memo = '') {
            return __awaiter(this, void 0, void 0, function* () {
                const [{ type, pubkey: rawPubKey }] = (yield this._signer.getAccounts());
                if (!['ica'].includes(type))
                    return yield this._signAndBroadcast(signerAddress, messages, fee, memo);
                this._gasPrice.denom;
                const pubkey = (0, proto_signing_1.encodePubkey)({
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
                const chainId = yield this.getChainId();
                const granter = typeof fee === 'object' ? fee.granter : undefined;
                const payer = typeof fee === 'object' ? fee.payer : undefined;
                const authInfoBytes = (0, proto_signing_1.makeAuthInfoBytes)([{ pubkey, sequence: 0 }], [{ denom: this._gasPrice.denom, amount: '0' }], 0, granter, payer);
                const signDoc = (0, proto_signing_1.makeSignDoc)(txBodyBytes, authInfoBytes, chainId, 0);
                return (yield this._signer.signDirect(signerAddress, signDoc));
            });
        }
    });
    return cwclient;
}
exports.setupWithVectisExtension = setupWithVectisExtension;
