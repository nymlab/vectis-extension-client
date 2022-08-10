import { CosmosProvider } from './cosmos';

export interface VectisWindow {
  vectis: {
    cosmos: CosmosProvider;
    version: string;
  };
}
