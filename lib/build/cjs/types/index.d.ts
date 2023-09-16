import { VectisCosmosClient } from './clients/cosmos.client';
import { setupWithVectisExtension } from './extensions/cosmjs';
export { VectisCosmosClient, setupWithVectisExtension };
export * from './types';
export declare function getVectisForCosmos(url?: string): Promise<VectisCosmosClient>;
//# sourceMappingURL=index.d.ts.map