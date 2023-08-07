import { VectisCosmosProvider } from './providers/cosmos.provider';

export { VectisCosmosProvider };
export * from './types';

export async function getVectisForCosmos(): Promise<VectisCosmosProvider> {
  return new Promise((resolve, reject) => {
    const URL = 'https:/iwallet.vectis.space/js/injectedScript.bundle.js';
    if (!document.querySelector(`script[src="${URL}"]`)) {
      const script = document.createElement('script');
      script.src = URL;
      document.head.appendChild(script);
    }
    const interval = setInterval(() => {
      if (window.vectis) {
        clearInterval(interval);
        resolve(new VectisCosmosProvider());
      }
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      reject(new Error('Vectis is not installed'));
    }, 500);
  });
}
