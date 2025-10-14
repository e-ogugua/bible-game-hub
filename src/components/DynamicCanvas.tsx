import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { Suspense } from 'react';

interface DynamicCanvasProps {
  children: React.ReactNode;
}

export const DynamicCanvas: React.FC<DynamicCanvasProps> = ({ children }) => {
  return (
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
  );
};
