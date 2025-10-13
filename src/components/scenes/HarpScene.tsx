import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Plane, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export const HarpScene: React.FC = () => {
  const harpRef = useRef<THREE.Group>(null);
  const stringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (harpRef.current) {
      harpRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
    if (stringsRef.current) {
      stringsRef.current.children.forEach((string, index) => {
        const offset = index * 0.2;
        string.position.z = Math.sin(state.clock.elapsedTime * 2 + offset) * 0.05;
      });
    }
  });

  return (
    <group>
      {/* Stone floor */}
      <Plane args={[8, 8]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#D2B48C" />
      </Plane>

      {/* Harp frame */}
      <group ref={harpRef} position={[0, 1, 0]}>
        {/* Main frame */}
        <Box args={[0.2, 3, 0.1]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="#8B4513" />
        </Box>

        {/* Top curve */}
        <Box args={[1.5, 0.2, 0.1]} position={[0, 2.8, 0]} rotation={[0, 0, Math.PI / 6]}>
          <meshStandardMaterial color="#8B4513" />
        </Box>

        {/* Bottom base */}
        <Box args={[1.2, 0.3, 0.2]} position={[0, 0.2, 0]}>
          <meshStandardMaterial color="#654321" />
        </Box>

        {/* Harp strings */}
        <group ref={stringsRef}>
          {Array.from({ length: 10 }, (_, i) => (
            <Cylinder
              key={i}
              args={[0.01, 0.01, 2.5]}
              position={[
                (i - 4.5) * 0.12,
                1.5,
                0.05
              ]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <meshStandardMaterial color="#FFD700" />
            </Cylinder>
          ))}
        </group>

        {/* Sound waves emanating from harp */}
        <group>
          {Array.from({ length: 3 }, (_, i) => (
            <Plane
              key={i}
              args={[0.5 + i * 0.3, 0.5 + i * 0.3]}
              position={[0, 1.5, 0.1 + i * 0.2]}
            >
              <meshStandardMaterial
                color="#87CEEB"
                transparent
                opacity={0.3 - i * 0.1}
              />
            </Plane>
          ))}
        </group>
      </group>

      {/* David figure playing harp */}
      <group position={[-1.5, 0.5, 0]}>
        <Cylinder args={[0.3, 0.3, 1]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#FDBCB4" />
        </Cylinder>
        <Sphere args={[0.2]} position={[0, 1.2, 0]}>
          <meshStandardMaterial color="#8B4513" />
        </Sphere>
      </group>

      {/* Warm lighting */}
      <pointLight position={[0, 3, 2]} intensity={1} color="#FFD700" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 1]} intensity={0.5} />
    </group>
  );
};
