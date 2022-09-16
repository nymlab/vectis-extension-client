import { AminoSignResponse, StdSignDoc } from '@cosmjs/amino';
import { DirectSignResponse, OfflineSigner } from '@cosmjs/proto-signing';
import { SignDoc } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { CosmosProvider } from '../types/cosmos';
import { ChainInfo, KeyInfo } from '../types/vectis';

export function getClient(): CosmosProvider {
  return window.vectis.cosmos;
}

export async function getSupportedChains(): Promise<ChainInfo[]> {
  return await window.vectis.cosmos.getSupportedChains();
}

export async function getKey(chainId: string): Promise<KeyInfo> {
  return await window.vectis.cosmos.getKey(chainId);
}

export async function getAccount(chainId: string): Promise<{ address: string; name: string }> {
  const { address, name } = await getKey(chainId);
  return { address, name };
}

export async function getOfflineSigner(chainId: string): Promise<OfflineSigner> {
  return await window.vectis.cosmos.getOfflineSigner(chainId);
}

export async function suggestChains(chainsInfo: ChainInfo[]): Promise<void> {
  await window.vectis.cosmos.suggestChains(chainsInfo);
}

export async function enable(chainId: string): Promise<void> {
  await window.vectis.cosmos.enable(chainId);
}

export async function signAmino(signerAddress: string, doc: StdSignDoc): Promise<AminoSignResponse> {
  return await window.vectis.cosmos.signAmino(signerAddress, doc);
}

export async function signDirect(signerAddress: string, doc: SignDoc): Promise<DirectSignResponse> {
  return await window.vectis.cosmos.signDirect(signerAddress, doc);
}

export async function isChainSupported(chainId: string): Promise<boolean> {
  const chains = await getSupportedChains();
  return chains.some((c) => c.chainId === chainId);
}

export function onAccountChange(handler: EventListener): void {
  window.addEventListener('vectis_accountChanged', handler);
}

export function offAccountChange(handler: EventListener): void {
  window.removeEventListener('vectis_accountChanged', handler);
}
