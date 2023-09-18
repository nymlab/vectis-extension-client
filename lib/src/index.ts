import { VectisCosmosClient } from './clients/cosmos.client';
import { setupWithVectisExtension } from './extensions/cosmjs';

export { VectisCosmosClient, setupWithVectisExtension };
export * from './types';

export async function getVectisForCosmos(
  url = `https://ipfs.io/ipfs/Qma4jV95Yp9NcTyEqXmMztL5kDC6gR3tiPRYR9q8UAaCv4`
): Promise<VectisCosmosClient> {
  const iframe = document.querySelector(`.vectis-iframe`);
  if (iframe?.getAttribute('isReady')) return new VectisCosmosClient();
  return new Promise((resolve, reject) => {
    if (!document.querySelector(`script[src="${url}"]`)) {
      const script = document.createElement('script');
      script.src = url;
      document.head.appendChild(script);
    }

    const listener = (e: MessageEvent) => {
      if (e.data.type === 'vectis-ready') {
        removeEventListener('message', listener);
        document.querySelector('.vectis-iframe')?.setAttribute('isReady', 'true');
        resolve(new VectisCosmosClient());
      }
    };

    addEventListener('message', listener);
  });
}
