import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Plane, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

export const HealingScene: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const jesusRef = useRef<THREE.Group>(null);
  const healingLightRef = useRef<THREE.Mesh>(null);
  const personRef = useRef<THREE.Group>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useFrame((state) => {
    if (!isClient) return;

    if (jesusRef.current) {
      jesusRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    if (healingLightRef.current) {
      const time = state.clock.elapsedTime;
      healingLightRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.3);
      healingLightRef.current.rotation.y = time * 0.5;
    }
    if (personRef.current) {
      personRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  // Don't render during SSR
  if (!isClient) {
    return null;
  }

  return (
    <group>
      {/* Stone floor */}
      <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#D2B48C" />
      </Plane>

      {/* Jesus figure */}
      <group ref={jesusRef} position={[0, 0.5, 0]}>
        <Cylinder args={[0.4, 0.4, 1.2]} position={[0, 0.6, 0]}>
          <meshStandardMaterial color="#FDBCB4" />
        </Cylinder>
        <Sphere args={[0.25]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="#8B4513" />
        </Sphere>
        {/* Robe */}
        <Box args={[0.8, 0.8, 0.1]} position={[0, 0.8, 0.2]}>
          <meshStandardMaterial color="#FFFFFF" />
        </Box>
      </group>

      {/* Person being healed */}
      <group ref={personRef} position={[2, 0.3, 0]}>
        <Cylinder args={[0.3, 0.3, 0.8]} position={[0, 0.4, 0]}>
          <meshStandardMaterial color="#FDBCB4" />
        </Cylinder>
        <Sphere args={[0.2]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#8B4513" />
        </Sphere>
      </group>

      {/* Healing light/glow */}
      <Sphere ref={healingLightRef} args={[0.8]} position={[1, 1, 0]}>
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </Sphere>

      {/* Additional healing particles */}
      <group position={[1, 1, 0]}>
        {Array.from({ length: 5 }, (_, i) => (
          <Sphere
            key={i}
            args={[0.1]}
            position={[
              Math.sin(i * Math.PI * 0.4) * 1.5,
              Math.cos(i * Math.PI * 0.4) * 1.5,
              0
            ]}
          >
            <meshStandardMaterial
              color="#FFA500"
              emissive="#FFA500"
              emissiveIntensity={0.5}
            />
          </Sphere>
        ))}
      </group>

      {/* Divine lighting */}
      <pointLight position={[1, 3, 1]} intensity={2} color="#FFD700" />
      <spotLight
        position={[0, 4, 0]}
        target-position={[1, 1, 0]}
        angle={0.4}
        intensity={1.5}
        color="#FFFACD"
      />
      <ambientLight intensity={0.5} />
    </group>
  );
};
