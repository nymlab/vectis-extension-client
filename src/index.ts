import * as cosmosProvider from './cosmos/cosmos.provider';

export type Cosmos = typeof cosmosProvider;

export function isInstalled(): boolean {
  return !!window.vectis;
}

export function cosmos(): Promise<Cosmos> {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (isInstalled()) {
        clearInterval(interval);
        resolve(cosmosProvider);
      }
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      reject(new Error('Vectis is not installed'));
    }, 500);
  });
}
