import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Plane } from '@react-three/drei';
import * as THREE from 'three';

export const ResurrectionScene: React.FC = () => {
  const lightRaysRef = useRef<THREE.Group>(null);
  const crossRef = useRef<THREE.Group>(null);
  const stoneRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (lightRaysRef.current) {
      lightRaysRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      lightRaysRef.current.children.forEach((ray, index) => {
        ray.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.3;
      });
    }
    if (crossRef.current) {
      crossRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (stoneRef.current) {
      stoneRef.current.position.x = -2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <group>
      {/* Ground with grass */}
      <Plane args={[12, 12]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#90EE90" />
      </Plane>

      {/* Empty tomb - rolled away stone */}
      <Sphere ref={stoneRef} args={[0.8]} position={[-2, 0.4, 0]}>
        <meshStandardMaterial color="#696969" />
      </Sphere>

      {/* Cross (empty) */}
      <group ref={crossRef} position={[0, 2, -1]}>
        <Box args={[0.2, 3, 0.2]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="#8B4513" />
        </Box>
        <Box args={[1.5, 0.2, 0.2]} position={[0, 2.5, 0]}>
          <meshStandardMaterial color="#8B4513" />
        </Box>
      </group>

      {/* Radiant light rays */}
      <group ref={lightRaysRef} position={[0, 2, 0]}>
        {Array.from({ length: 8 }, (_, i) => (
          <Box
            key={i}
            args={[0.1, 4, 0.1]}
            position={[
              Math.sin((i / 8) * Math.PI * 2) * 3,
              2,
              Math.cos((i / 8) * Math.PI * 2) * 3
            ]}
            rotation={[
              0,
              (i / 8) * Math.PI * 2,
              Math.PI / 2
            ]}
          >
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={0.8}
              transparent
              opacity={0.7}
            />
          </Box>
        ))}
      </group>

      {/* Central bright light */}
      <Sphere args={[0.5]} position={[0, 2, 0]}>
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={1}
        />
      </Sphere>

      {/* Additional light particles */}
      <group position={[0, 2, 0]}>
        {Array.from({ length: 12 }, (_, i) => {
          const time = Date.now() * 0.001; // Use a simple time for animation
          return (
            <Sphere
              key={i}
              args={[0.05]}
              position={[
                Math.sin((i / 12) * Math.PI * 2) * (2 + Math.sin(time * 3 + i) * 0.5),
                2 + Math.sin(time * 2 + i * 0.5) * 0.3,
                Math.cos((i / 12) * Math.PI * 2) * (2 + Math.cos(time * 3 + i) * 0.5)
              ]}
            >
              <meshStandardMaterial
                color="#FFFACD"
                emissive="#FFFACD"
                emissiveIntensity={0.8}
              />
            </Sphere>
          );
        })}
      </group>

      {/* Divine lighting */}
      <pointLight position={[0, 4, 0]} intensity={3} color="#FFD700" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <ambientLight intensity={0.6} />
    </group>
  );
};
