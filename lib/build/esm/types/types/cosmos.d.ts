/**
 * Types in this file belongs to cosmjs library https://github.com/cosmos/cosmjs and https://github.com/confio/cosmjs-types
 * We extract them in order to reduce the size of the bundle.
 */
/// <reference types="long" />
export interface AccountData {
    /** A printable address (typically bech32 encoded) */
    readonly address: string;
    readonly algo: Algo;
    readonly pubkey: Uint8Array;
}
export interface Pubkey {
    readonly type: string;
    readonly value: any;
}
export declare type Algo = 'secp256k1' | 'ed25519' | 'sr25519';
export interface Coin {
    readonly denom: string;
    readonly amount: string;
}
export interface StdFee {
    readonly amount: readonly Coin[];
    readonly gas: string;
}
export interface StdSignDoc {
    readonly chain_id: string;
    readonly account_number: string;
    readonly sequence: string;
    readonly fee: StdFee;
    readonly msgs: readonly AminoMsg[];
    readonly memo: string;
}
export interface AminoMsg {
    readonly type: string;
    readonly value: any;
}
export interface AminoSignResponse {
    /**
     * The sign doc that was signed.
     * This may be different from the input signDoc when the signer modifies it as part of the signing process.
     */
    readonly signed: StdSignDoc;
    readonly signature: StdSignature;
}
export interface DirectSignResponse {
    /**
     * The sign doc that was signed.
     * This may be different from the input signDoc when the signer modifies it as part of the signing process.
     */
    readonly signed: SignDoc;
    readonly signature: StdSignature;
}
export interface StdSignature {
    readonly pub_key: Pubkey;
    readonly signature: string;
}
export interface SignDoc {
    /**
     * body_bytes is protobuf serialization of a TxBody that matches the
     * representation in TxRaw.
     */
    bodyBytes: Uint8Array;
    /**
     * auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
     * representation in TxRaw.
     */
    authInfoBytes: Uint8Array;
    /**
     * chain_id is the unique identifier of the chain this transaction targets.
     * It prevents signed transactions from being used on another chain by an
     * attacker
     */
    chainId: string;
    /** account_number is the account number of the account in state */
    accountNumber: Long;
}
export interface TxRaw {
    /**
     * body_bytes is a protobuf serialization of a TxBody that matches the
     * representation in SignDoc.
     */
    bodyBytes: Uint8Array;
    /**
     * auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
     * representation in SignDoc.
     */
    authInfoBytes: Uint8Array;
    /**
     * signatures is a list of signatures that matches the length and order of
     * AuthInfo's signer_infos to allow connecting signature meta information like
     * public key and signing mode by position.
     */
    signatures: Uint8Array[];
}
export interface OfflineDirectSigner {
    readonly getAccounts: () => Promise<readonly AccountData[]>;
    readonly signDirect: (signerAddress: string, signDoc: SignDoc) => Promise<DirectSignResponse>;
}
export interface OfflineAminoSigner {
    /**
     * Get AccountData array from wallet. Rejects if not enabled.
     */
    readonly getAccounts: () => Promise<readonly AccountData[]>;
    /**
     * Request signature from whichever key corresponds to provided bech32-encoded address. Rejects if not enabled.
     *
     * The signer implementation may offer the user the ability to override parts of the signDoc. It must
     * return the doc that was signed in the response.
     *
     * @param signerAddress The address of the account that should sign the transaction
     * @param signDoc The content that should be signed
     */
    readonly signAmino: (signerAddress: string, signDoc: StdSignDoc) => Promise<AminoSignResponse>;
}
export declare type OfflineSigner = OfflineAminoSigner | OfflineDirectSigner;
//# sourceMappingURL=cosmos.d.ts.map