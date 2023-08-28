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
exports.VectisCosmosProvider = void 0;
class VectisCosmosProvider {
    getClient() {
        var _a;
        if ((_a = window.vectis) === null || _a === void 0 ? void 0 : _a.cosmos)
            return window.vectis.cosmos;
        throw new Error('Vectis is not installed');
    }
    enable(chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getClient().enable(chainId);
        });
    }
    getAccount(chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getClient().getAccount(chainId);
        });
    }
    getAccounts(chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getClient().getAccounts(chainId);
        });
    }
    signAmino(signerAddress, doc) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getClient().signAmino(signerAddress, doc);
        });
    }
    signDirect(signerAddress, doc) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getClient().signDirect(signerAddress, doc);
        });
    }
    getOfflineSignerAmino(chainId) {
        return this.getClient().getOfflineSignerAmino(chainId);
    }
    getOfflineSignerDirect(chainId) {
        return this.getClient().getOfflineSignerDirect(chainId);
    }
    getOfflineSigner(chainId) {
        return this.getClient().getOfflineSigner(chainId);
    }
}
exports.VectisCosmosProvider = VectisCosmosProvider;
