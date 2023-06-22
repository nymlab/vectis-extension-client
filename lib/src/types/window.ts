import { CosmosProvider } from './vectis';

export interface VectisWindow {
  vectis: {
    cosmos: CosmosProvider;
    version: string;
  };
}
