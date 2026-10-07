import { createContext, useContext } from 'react';

export const EngineContext = createContext(null);

export function useEngine() {
  const context = useContext(EngineContext);
  if (!context) {
    throw new Error(
      'useEngine must be used within an EngineProvider React component',
    );
  }
  return context;
}
