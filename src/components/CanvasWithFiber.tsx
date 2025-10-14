import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';

interface CanvasWithFiberProps {
  children?: React.ReactNode;
}

export const CanvasWithFiber: React.FC<CanvasWithFiberProps> = ({ children }) => {
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
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      {children && (
        <Html center>
          {children}
        </Html>
      )}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        maxDistance={10}
        minDistance={2}
        autoRotate={false}
      />
      <Environment preset="sunset" />
    </Canvas>
  );
};
