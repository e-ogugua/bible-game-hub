import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { Suspense } from 'react';

interface Scene3DProps {
  children: React.ReactNode;
  className?: string;
}

export const Scene3D: React.FC<Scene3DProps> = ({ children, className = "" }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render Canvas during SSR to prevent React Three Fiber initialization issues
  if (!isClient) {
    return (
      <div className={`w-full h-64 md:h-80 ${className} bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg flex items-center justify-center`}>
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
          <p className="text-sm">Loading 3D scene...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-64 md:h-80 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        dpr={[1, 2]} // Adaptive pixel ratio for better performance on mobile
      >
        {/* Performance optimizations */}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <Suspense fallback={
          <Html center>
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p className="text-sm">Loading scene...</p>
            </div>
          </Html>
        }>
          <Environment preset="sunset" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          {children}

          {/* Mobile-optimized controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            maxDistance={8}
            minDistance={2}
            maxPolarAngle={Math.PI / 2}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
