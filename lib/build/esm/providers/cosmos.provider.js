export class VectisCosmosProvider {
    getClient() {
        if (window.vectis?.cosmos)
            return window.vectis.cosmos;
        throw new Error('Vectis is not installed');
    }
    async enable(chainId) {
        await this.getClient().enable(chainId);
    }
    async getKey(chainId) {
        return await this.getClient().getKey(chainId);
    }
    async getAccount(chainId) {
        return await this.getClient().getAccounts(chainId);
    }
    async signAmino(signerAddress, doc) {
        return await this.getClient().signAmino(signerAddress, doc);
    }
    async signDirect(signerAddress, doc) {
        return await this.getClient().signDirect(signerAddress, doc);
    }
    async getOfflineSignerAuto(chainId) {
        return await this.getClient().getOfflineSignerAuto(chainId);
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
    onAccountChange(handler) {
        window.addEventListener('vectis_accountChanged', handler);
    }
    offAccountChange(handler) {
        window.removeEventListener('vectis_accountChanged', handler);
    }
}
