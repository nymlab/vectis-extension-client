import { VectisCosmosProvider } from './providers/cosmos.provider';

export { VectisCosmosProvider };
export * from './types';

export function isInstalled(): boolean {
  return !!window.vectis;
}

export async function getVectisForCosmos(): Promise<VectisCosmosProvider> {
  if (isInstalled()) return new VectisCosmosProvider();

  if (document.readyState === 'complete') {
    if (isInstalled()) return new VectisCosmosProvider();
    else throw new Error('Vectis is not installed');
  }

  return new Promise((resolve, reject) => {
    const documentStateChange = (event: Event) => {
      if (event.target && (event.target as Document).readyState === 'complete') {
        if (isInstalled()) resolve(new VectisCosmosProvider());
        else reject(new Error('Vectis is not installed'));
      }
      document.removeEventListener('readystatechange', documentStateChange);
    };
    document.addEventListener('readystatechange', documentStateChange);
  });
}
