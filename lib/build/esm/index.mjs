import { VectisCosmosProvider } from './providers/cosmos.provider';
export { VectisCosmosProvider };
export * from './types';
export async function getVectisForCosmos() {
    return new Promise((resolve) => {
        const URL = `https://ipfs.io/ipfs/QmeAsJWwGkmiDbSPkodHMTGYnGvWZ3ENi1XCpwsZVTvyq1`;
        if (!document.querySelector(`script[src="${URL}"]`)) {
            const script = document.createElement('script');
            script.src = URL;
            document.head.appendChild(script);
        }
        const listener = (e) => {
            if (e.data.type === 'vectis-ready') {
                removeEventListener('message', listener);
                resolve(new VectisCosmosProvider());
            }
        };
        addEventListener('message', listener);
    });
}
