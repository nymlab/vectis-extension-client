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
const stargate_1 = require("@cosmjs/stargate");
const utils_1 = require("@cosmjs/utils");
function setupWithVectisExtension(client) {
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
        simulate(signerAddress, messages, memo = '') {
            return __awaiter(this, void 0, void 0, function* () {
                const [{ type }] = (yield this._signer.getAccounts());
                if (!['vectis', 'ica'].includes(type))
                    return yield this._simulate(signerAddress, messages, memo);
                return Promise.resolve(0);
            });
        },
        signAndBroadcast(signerAddress, messages, fee, memo = '') {
            return __awaiter(this, void 0, void 0, function* () {
                const [{ type }] = (yield this._signer.getAccounts());
                if (!['vectis', 'ica'].includes(type))
                    return yield this._signAndBroadcast(signerAddress, messages, fee, memo);
                let usedFee;
                if (fee == 'auto' || typeof fee === 'number') {
                    (0, utils_1.assertDefined)(this._gasPrice, 'Gas price must be set in the client options when auto gas is used.');
                    const gasEstimation = yield this.simulate(signerAddress, messages, memo);
                    // Starting with Cosmos SDK 0.47, we see many cases in which 1.3 is not enough anymore
                    // E.g. https://github.com/cosmos/cosmos-sdk/issues/16020
                    const multiplier = typeof fee === 'number' ? fee : 1.4;
                    usedFee = (0, stargate_1.calculateFee)(Math.round(gasEstimation * multiplier), this._gasPrice);
                }
                else {
                    usedFee = fee;
                }
                const txDelivered = (yield this.sign(signerAddress, messages, usedFee, memo));
                return txDelivered;
            });
        },
        sign(signerAddress, messages, fee, memo, explicitSignerData) {
            return __awaiter(this, void 0, void 0, function* () {
                const [{ type }] = (yield this._signer.getAccounts());
                if (!['vectis', 'ica'].includes(type))
                    return yield this._sign(signerAddress, messages, fee, memo, explicitSignerData);
                let signerData;
                if (explicitSignerData) {
                    signerData = explicitSignerData;
                }
                else {
                    const chainId = yield this.getChainId();
                    signerData = {
                        accountNumber: 0,
                        sequence: 0,
                        chainId: chainId
                    };
                }
                return this._signDirect(signerAddress, messages, fee, memo, signerData);
            });
        }
    });
    return cwclient;
}
exports.setupWithVectisExtension = setupWithVectisExtension;
