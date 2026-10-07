import { useRef, useState, useEffect } from 'react';
import Engine from './Engine.js';
import { EngineContext } from './EngineContext';

export function EngineProvider({ children }) {
  const [engine, setEngine] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isDestroyed = false;

    async function boot() {
      try {
        const instance = await Engine.create(canvas);
        if (isDestroyed) return;

        setEngine(instance);
      } catch (err) {
        console.error('Engine failed to boot:', err);
      }
    }

    boot();

    return () => {
      isDestroyed = true;
    };
  }, []);

  return (
    <EngineContext.Provider value={engine}>
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />
        {engine ? (
          children
        ) : (
          <div className="loading-screen">Booting WebGPU Engine...</div>
        )}
      </div>
    </EngineContext.Provider>
  );
}
