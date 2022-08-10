import { VectisWindow } from '../src/types/window';
export {};
declare global {
  interface Window extends VectisWindow {}
  const secrets: {
    vectisFactoryAddress: string;
  };
}
