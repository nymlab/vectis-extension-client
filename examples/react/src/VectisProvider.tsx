import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Cosmos, cosmos } from '../../../src';

export const VectisContext = React.createContext<Cosmos | null>(null);

interface Props {
  fallback: React.ReactElement;
}

const VectisProvider: React.FC<PropsWithChildren<Props>> = ({ children, fallback }) => {
  const [provider, setProvider] = useState<Cosmos | null>(null);

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await cosmos();
      // Optionally you can init here
      // if (!provider.isChainSupported('uni-3')) provider.suggestChains(...chainConfig)
      // provider.enable('uni-3')
      setProvider(provider);
    };
    loadProvider();
  }, []);

  if (!provider) return fallback;

  return <VectisContext.Provider value={{ ...provider }}>{children}</VectisContext.Provider>;
};

export const useVectis = () => {
  const context = React.useContext(VectisContext);
  if (!context) throw new Error('Provider is not instanced');
  return context;
};

export default VectisProvider;
