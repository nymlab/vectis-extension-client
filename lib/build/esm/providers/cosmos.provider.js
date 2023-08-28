export class VectisCosmosProvider {
    getClient() {
        if (window.vectis?.cosmos)
            return window.vectis.cosmos;
        throw new Error('Vectis is not installed');
    }
    async enable(chainId) {
        await this.getClient().enable(chainId);
    }
    async getAccount(chainId) {
        return await this.getClient().getAccount(chainId);
    }
    async getAccounts(chainId) {
        return await this.getClient().getAccounts(chainId);
    }
    async signAmino(signerAddress, doc) {
        return await this.getClient().signAmino(signerAddress, doc);
    }
    async signDirect(signerAddress, doc) {
        return await this.getClient().signDirect(signerAddress, doc);
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
